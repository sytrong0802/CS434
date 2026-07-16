<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Thông báo lịch hẹn mới</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
                    <tr>
                        <td style="background-color: #10b981; padding: 20px; text-align: center; color: #ffffff;">
                            <h2 style="margin: 0; font-size: 24px;">Lịch Hẹn Xem Phòng Mới</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p>Xin chào <strong>{{ $lichHen->chuTro->ho_ten }}</strong>,</p>
                            <p>Một khách hàng vừa đặt lịch hẹn xem phòng trọ của bạn trên hệ thống <strong>Hệ Thống Quản Lý và Tìm Kiếm Phòng Trọ</strong>.</p>
                            
                            <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; color: #111827; margin-top: 25px;">Thông tin khách hàng:</h3>
                            <table width="100%" cellpadding="5" cellspacing="0" style="font-size: 14px; margin-bottom: 20px;">
                                <tr>
                                    <td width="35%" style="font-weight: bold; color: #6b7280;">Họ và tên:</td>
                                    <td style="color: #111827;">{{ $lichHen->khachHang->ho_ten }}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280;">Số điện thoại:</td>
                                    <td style="color: #111827;">{{ $lichHen->khachHang->so_dien_thoai ?: 'Chưa cung cấp' }}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280;">Email:</td>
                                    <td style="color: #111827;">{{ $lichHen->khachHang->email }}</td>
                                </tr>
                            </table>

                            <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; color: #111827; margin-top: 25px;">Thông tin lịch hẹn:</h3>
                            <table width="100%" cellpadding="5" cellspacing="0" style="font-size: 14px; margin-bottom: 20px;">
                                <tr>
                                    <td width="35%" style="font-weight: bold; color: #6b7280;">Thời gian hẹn:</td>
                                    <td style="color: #10b981; font-weight: bold;">
                                        {{ \Carbon\Carbon::parse($lichHen->thoi_gian_hen)->format('H:i - d/m/Y') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280;">Tin đăng liên quan:</td>
                                    <td style="color: #111827;">{{ $lichHen->tinDang->tieu_de }}</td>
                                </tr>
                                @if($lichHen->phongTro)
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280;">Phòng cụ thể:</td>
                                    <td style="color: #111827;">{{ $lichHen->phongTro->ten_phong }}</td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280; vertical-align: top;">Lời nhắn từ khách:</td>
                                    <td style="color: #111827; font-style: italic; background-color: #f9fafb; padding: 10px; border-radius: 4px;">
                                        "{{ $lichHen->loi_nhan ?: 'Không có lời nhắn' }}"
                                    </td>
                                </tr>
                            </table>

                            <p style="margin-top: 30px;">Vui lòng truy cập trang quản lý của bạn để chấp nhận hoặc từ chối lịch hẹn này.</p>
                            <br>
                            <p style="margin: 0;">Trân trọng,</p>
                            <p style="margin: 0; font-weight: bold; color: #10b981;">Ban Quản Trị Hệ Thống</p>
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
