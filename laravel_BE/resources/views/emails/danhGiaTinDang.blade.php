<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Đánh giá tin đăng mới - PHONGTRO HQC</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
                    <tr>
                        <td style="background-color: #f59e0b; padding: 20px; text-align: center; color: #ffffff;">
                            <h2 style="margin: 0; font-size: 24px;">Đánh Giá Bài Đăng Mới</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p>Xin chào <strong>Chủ trọ</strong>,</p>
                            <p>Khách hàng từng thuê tại phòng trọ/nhà trọ của bạn vừa gửi đánh giá cho tin đăng <strong>"{{ $danhGia->tinDang->tieu_de }}"</strong>.</p>
                            
                            <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; color: #111827; margin-top: 25px;">Nội dung đánh giá:</h3>
                            <table width="100%" cellpadding="5" cellspacing="0" style="font-size: 14px; margin-bottom: 20px;">
                                <tr>
                                    <td width="35%" style="font-weight: bold; color: #6b7280;">Người đánh giá:</td>
                                    <td style="color: #111827; font-weight: bold;">{{ $danhGia->khachHang->ho_ten }}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280;">Điểm đánh giá:</td>
                                    <td style="font-size: 18px; font-weight: bold; color: #f59e0b;">
                                        @for($i = 1; $i <= 5; $i++)
                                            @if($i <= $danhGia->so_sao)
                                                ★
                                            @else
                                                ☆
                                            @endif
                                        @endfor
                                        <span style="font-size: 14px; color: #6b7280; font-weight: normal; margin-left: 5px;">({{ $danhGia->so_sao }}/5 sao)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280; vertical-align: top;">Bình luận:</td>
                                    <td style="color: #4b5563; font-style: italic; background-color: #f9fafb; padding: 12px; border-radius: 6px; border-left: 4px solid #f59e0b;">
                                        "{{ $danhGia->binh_luan ?? 'Không có bình luận chi tiết.' }}"
                                    </td>
                                </tr>
                            </table>

                            <p style="margin-top: 30px;">Bạn có thể đăng nhập vào trang chủ trọ để gửi phản hồi, cảm ơn ý kiến đóng góp của khách thuê hoặc giải đáp thắc mắc của họ nhằm nâng cao độ uy tín của tin đăng.</p>
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
