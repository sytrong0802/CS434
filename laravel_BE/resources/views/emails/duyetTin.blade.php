<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kết quả duyệt tin đăng - PHONGTRO HQC</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
                    <tr>
                        @if($tinDang->trang_thai === 'HIEN_THI')
                        <td style="background-color: #10b981; padding: 20px; text-align: center; color: #ffffff;">
                            <h2 style="margin: 0; font-size: 24px;">Tin Đăng Đã Được Duyệt</h2>
                        </td>
                        @else
                        <td style="background-color: #ef4444; padding: 20px; text-align: center; color: #ffffff;">
                            <h2 style="margin: 0; font-size: 24px;">Tin Đăng Bị Từ Chối</h2>
                        </td>
                        @endif
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p>Xin chào <strong>{{ $tinDang->chuTro->ho_ten }}</strong>,</p>
                            <p>Ban quản trị hệ thống <strong>PHONGTRO HQC</strong> đã kiểm duyệt tin đăng của bạn.</p>
                            
                            <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; color: #111827; margin-top: 25px;">Thông tin tin đăng:</h3>
                            <table width="100%" cellpadding="5" cellspacing="0" style="font-size: 14px; margin-bottom: 20px;">
                                <tr>
                                    <td width="35%" style="font-weight: bold; color: #6b7280;">Tiêu đề tin đăng:</td>
                                    <td style="color: #111827; font-weight: bold;">{{ $tinDang->tieu_de }}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280;">Địa chỉ:</td>
                                    <td style="color: #111827;">{{ $tinDang->dia_chi_chi_tiet }}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280;">Giá thuê:</td>
                                    <td style="color: #111827; font-weight: bold; color: #10b981;">
                                        {{ number_format($tinDang->gia_thue_min, 0, ',', '.') }} VNĐ/tháng
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280;">Kết quả duyệt:</td>
                                    <td style="font-weight: bold;">
                                        @if($tinDang->trang_thai === 'HIEN_THI')
                                            <span style="color: #10b981;">ĐỒNG Ý (ĐÃ ĐƯỢC HIỂN THỊ)</span>
                                        @else
                                            <span style="color: #ef4444;">TỪ CHỐI DUYỆT</span>
                                        @endif
                                    </td>
                                </tr>
                                @if($tinDang->trang_thai === 'TU_CHOI' && $tinDang->ly_do_tu_choi)
                                <tr>
                                    <td style="font-weight: bold; color: #ef4444; vertical-align: top;">Lý do từ chối:</td>
                                    <td style="color: #ef4444; font-style: italic; background-color: #fef2f2; padding: 10px; border-radius: 4px; border-left: 4px solid #ef4444;">
                                        "{{ $tinDang->ly_do_tu_choi }}"
                                    </td>
                                </tr>
                                @endif
                            </table>

                            @if($tinDang->trang_thai === 'HIEN_THI')
                            <p style="margin-top: 30px;">Chúc mừng bạn! Tin đăng của bạn hiện đã hiển thị trên website chính thức để khách hàng tìm kiếm và đặt lịch xem phòng.</p>
                            @else
                            <p style="margin-top: 30px;">Rất tiếc vì tin đăng chưa đáp ứng đủ tiêu chuẩn kiểm duyệt của hệ thống. Quý khách vui lòng kiểm tra lại lý do từ chối trên, chỉnh sửa thông tin bài đăng và gửi duyệt lại.</p>
                            @endif
                            <br>
                            <p style="margin: 0;">Trân trọng,</p>
                            <p style="margin: 0; font-weight: bold; color: #2563eb;">Ban Quản Trị PHONGTRO HQC</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
                            Đây là email tự động từ hệ thống. Vui lòng không phản hồi lại email này.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
