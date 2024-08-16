import createMiddleware from "next-intl/middleware"; // createMiddleware là một hàm từ next-intl/middleware dùng để tạo middleware cho quản lý đa ngôn ngữ.

export default createMiddleware({
    locales: ["en", "vn"],
    defaultLocale: "en",
})

export const config = {
    // matcher: ["/((?!api).*)", "/api"],
    matcher: ["/", "/(vn|en)/:path*"],
};