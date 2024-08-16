import createMiddleware from "next-intl/middleware"; // createMiddleware là một hàm từ next-intl/middleware dùng để tạo middleware cho quản lý đa ngôn ngữ.

export default createMiddleware({
    locales: ["en", "vn"],
    defaultLocale: "en",
})

/**
 * matcher: Cấu hình này xác định các đường dẫn (routes) mà middleware sẽ áp dụng.
 * "/((?!api).*)": Middleware sẽ áp dụng cho tất cả các đường dẫn không chứa /api.
 * "/api": Middleware cũng sẽ áp dụng cho tất cả các đường dẫn bắt đầu bằng /api.
 * 
 * Điều này có nghĩa là middleware sẽ xử lý các yêu cầu đến tất cả các trang của ứng dụng (không phải API) 
 * và các yêu cầu đến API nếu bạn muốn áp dụng middleware cho các API route (tuỳ thuộc vào cấu hình của bạn).
 * 
 * Tóm lại, đoạn mã cấu hình middleware để hỗ trợ đa ngôn ngữ cho ứng dụng của bạn, với các ngôn ngữ cụ thể và ngôn ngữ mặc định, đồng thời chỉ định các đường dẫn mà middleware sẽ áp dụng.
 * 
 * "/":
 * Đây là một mẫu đường dẫn đơn giản mà middleware sẽ áp dụng cho trang gốc của ứng dụng. 
 * Điều này có nghĩa là middleware sẽ được kích hoạt cho trang chính của ứng dụng.
 * 
 * "/(vn|en)/:path*":
 * Đây là một mẫu đường dẫn phức tạp hơn cho phép middleware xử lý các yêu cầu đến các đường dẫn cụ thể dựa trên ngôn ngữ.
 * "(vn|en)": Đây là một phần của mẫu đường dẫn, cho phép các đường dẫn bắt đầu với /vn hoặc /en, tương ứng với các ngôn ngữ được hỗ trợ (tiếng Việt hoặc tiếng Anh).
 * "/:path*": Đây là một phần của mẫu đường dẫn cho phép middleware áp dụng cho tất cả các đường dẫn tiếp theo sau phần ngôn ngữ, bao gồm bất kỳ sub-path nào.
 * 
 * Ví dụ về ứng dụng
 * /: Được áp dụng cho trang gốc của ứng dụng, ví dụ như trang chính hoặc trang chủ.
 * /vn/some-path: Được áp dụng cho các đường dẫn bắt đầu bằng /vn, ví dụ như /vn/about hoặc /vn/products.
 * /en/another-path: Được áp dụng cho các đường dẫn bắt đầu bằng /en, ví dụ như /en/contact hoặc /en/services.
 * 
 * Ý Nghĩa
 * Cấu hình matcher này cho phép middleware xử lý các yêu cầu đến các trang của ứng dụng, dựa trên ngôn ngữ trong đường dẫn. 
 * Điều này rất hữu ích khi bạn muốn middleware hỗ trợ đa ngôn ngữ và đảm bảo rằng các đường dẫn phù hợp với cấu hình ngôn ngữ 
 * của ứng dụng.
 * 
 */
export const config = {
    // matcher: ["/((?!api).*)", "/api"],
    matcher: ["/", "/(vn|en)/:path*"],
};