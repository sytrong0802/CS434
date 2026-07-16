<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Phản hồi yêu cầu đặt lịch hẹn xem phòng</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
                    <tr>
                        <td style="background-color: #2563eb; padding: 20px; text-align: center; color: #ffffff;">
                            <h2 style="margin: 0; font-size: 24px;">Phản Hồi Lịch Hẹn Xem Phòng</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p>Xin chào <strong>{{ $lichHen->khachHang->ho_ten }}</strong>,</p>
                            <p>Chủ trọ đã phản hồi yêu cầu đặt lịch hẹn xem phòng của bạn trên hệ thống <strong>PHONGTRO HQC</strong>.</p>
                            
                            <h3 style="border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; color: #111827; margin-top: 25px;">Thông tin chi tiết lịch hẹn:</h3>
                            <table width="100%" cellpadding="5" cellspacing="0" style="font-size: 14px; margin-bottom: 20px;">
                                <tr>
                                    <td width="35%" style="font-weight: bold; color: #6b7280;">Bài đăng:</td>
                                    <td style="color: #111827; font-weight: bold;">{{ $lichHen->tinDang->tieu_de }}</td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280;">Thời gian hẹn:</td>
                                    <td style="color: #111827;">
                                        {{ \Carbon\Carbon::parse($lichHen->thoi_gian_hen)->format('H:i - d/m/Y') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; color: #6b7280;">Trạng thái:</td>
                                    <td style="color: #2563eb; font-weight: bold;">
                                        @if($lichHen->trang_thai === 'DA_CHAP_NHAN' || $lichHen->trang_thai === 'DA_XAC_NHAN')
                                            Đã xác nhận (Đồng ý)
                                        @elseif($lichHen->trang_thai === 'TU_CHOI')
                                            Bị từ chối
                                        @elseif($lichHen->trang_thai === 'DA_HUY')
                                            Đã hủy
                                        @else
                                            {{ $lichHen->trang_thai }}
                                        @endif
                                    </td>
                                </tr>
                                @if($lichHen->trang_thai === 'TU_CHOI' && $lichHen->ly_do_tu_choi)
                                <tr>
                                    <td style="font-weight: bold; color: #dc2626; vertical-align: top;">Lý do từ chối:</td>
                                    <td style="color: #dc2626; font-style: italic; background-color: #fef2f2; padding: 10px; border-radius: 4px;">
                                        "{{ $lichHen->ly_do_tu_choi }}"
                                    </td>
                                </tr>
                                @endif
                            </table>

                            <p style="margin-top: 30px;">Vui lòng truy cập lại trang quản lý lịch hẹn của bạn để kiểm tra chi tiết.</p>
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
