const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // MOCK MODE CHECK
        if (process.env.MOCK_AUTH === 'true') {
            console.log('⚠️ [Mock Mode] Simulating registration for:', email);
            return res.status(201).json({
                success: true,
                token: 'mock-jwt-token-' + Date.now(),
                user: { id: 'mock-id-' + Date.now(), name, email, role }
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // MOCK MODE CHECK
        if (process.env.MOCK_AUTH === 'true') {
            console.log('⚠️ [Mock Mode] Simulating login for:', email);
            return res.status(200).json({
                success: true,
                token: 'mock-jwt-token-' + Date.now(),
                user: {
                    id: 'mock-id-' + Date.now(),
                    name: email.split('@')[0],
                    email,
                    role: 'farmer'
                }
            });
        }

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, error: 'There is no user with that email' });
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset url
        const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;

        console.log('--------------------------------------------');
        console.log('RESET PASSWORD SIMULATION');
        console.log(`Email: ${user.email}`);
        console.log(`Reset Token: ${resetToken}`);
        console.log(`Reset URL: ${resetUrl}`);
        console.log('--------------------------------------------');

        res.status(200).json({
            success: true,
            data: 'Email sent',
            resetToken // Sending for debugging convenience
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Email could not be sent' });
    }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid token' });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};
