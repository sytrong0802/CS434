<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Yêu cầu đặt lại mật khẩu</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
                    <tr>
                        <td style="background-color: #3b82f6; padding: 20px; text-align: center; color: #ffffff;">
                            <h2 style="margin: 0; font-size: 24px;">Đặt Lại Mật Khẩu</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p>Xin chào <strong>{{ $data['ho_va_ten'] }}</strong>,</p>
                            <p>Chúng tôi nhận được yêu cầu khôi phục mật khẩu cho tài khoản của bạn trên hệ thống <strong>Hệ Thống Quản Lý và Tìm Kiếm Phòng Trọ</strong>.</p>
                            <p>Dưới đây là mã xác minh bảo mật của bạn. Vui lòng nhập mã này vào trang xác thực để tiến hành thay đổi mật khẩu của mình:</p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <span style="display: inline-block; font-size: 32px; font-weight: bold; color: #3b82f6; letter-spacing: 5px; background-color: #eff6ff; padding: 15px 30px; border-radius: 6px; border: 1px dashed #3b82f6;">
                                    {{ $data['ma_bi_mat'] }}
                                </span>
                            </div>
                            
                            <p style="color: #ef4444; font-weight: bold;">Lưu ý: Mã xác minh này có hiệu lực trong vòng 15 phút. Tuyệt đối không chia sẻ mã này với bất kỳ ai khác.</p>
                            <p>Nếu bạn không gửi yêu cầu này, vui lòng bỏ qua email này hoặc liên hệ với bộ phận hỗ trợ của chúng tôi để được trợ giúp bảo mật tài khoản.</p>
                            <br>
                            <p style="margin: 0;">Trân trọng,</p>
                            <p style="margin: 0; font-weight: bold; color: #3b82f6;">Ban Quản Trị Hệ Thống</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
                            Đây là email tự động từ hệ thống. Vui lòng không trả lời trực tiếp email này.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
