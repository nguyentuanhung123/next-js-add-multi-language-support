import { notFound } from "next/navigation"; // được sử dụng để điều hướng đến trang lỗi 404 khi không tìm thấy nội dung.
import { getRequestConfig } from "next-intl/server"; //  là một hàm để cấu hình và xử lý các yêu cầu liên quan đến đa ngôn ngữ.

const locales = ["en", "vn"];

/**
 * getRequestConfig được sử dụng để trả về cấu hình cho các yêu cầu. 
 * Hàm này nhận một hàm bất đồng bộ (async function) để xử lý yêu cầu.
 * 
 * Trong hàm bất đồng bộ:
 * locale là tham số chứa thông tin về ngôn ngữ yêu cầu.
 * Nếu locale không có trong danh sách locales, notFound() sẽ được gọi để điều hướng người dùng đến trang lỗi 404.
 * Nếu ngôn ngữ hợp lệ, đoạn mã sẽ động (dynamic) nhập (import) tệp JSON chứa thông điệp cho ngôn ngữ đó từ thư mục ./messages/.
 * Tệp JSON được nhập sẽ chứa các thông điệp (messages) cho ngôn ngữ tương ứng.
 * 
 * Về cơ bản, đoạn mã này cấu hình ứng dụng để sử dụng các thông điệp đa ngôn ngữ dựa trên ngôn ngữ yêu cầu và điều hướng người dùng đến trang lỗi 404 nếu ngôn ngữ không được hỗ trợ.
 * 
 * Khi hàm notFound() được gọi trong Next.js, nó không trả về một giá trị cụ thể. 
 * Thay vào đó, nó tạo ra một phản hồi HTTP với mã lỗi 404, điều hướng người dùng đến trang lỗi 404.
 * Để giải thích rõ hơn:
 * notFound(): Hàm này thuộc về next/navigation và thường được sử dụng trong các hàm xử lý yêu cầu để báo cho Next.js rằng tài nguyên không tồn tại, và ứng dụng nên trả về trang lỗi 404 cho người dùng.
 * Khi notFound() được gọi, Next.js sẽ không thực hiện tiếp các phần còn lại của mã trong hàm xử lý. Nó sẽ ngừng xử lý yêu cầu và trả về một phản hồi 404 cho trình duyệt.
 * Do đó, nếu notFound() được gọi, mã sau nó trong hàm bất đồng bộ sẽ không được thực hiện.
 * 
 */
export default getRequestConfig(async({locale}) => {
    if(!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});