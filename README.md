This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Các bước chuẩn bị

- B1: npm i next-intl (nếu bị lỗi: npm i next-intl --force)
- B2: Vào file bổ sung next.config.mjs

- Ban đầu

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

- Sau khi thêm và chỉnh sửa

```mjs
/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig = {};

export default withNextIntl(nextConfig);
```

- B3: Tạo file i18n.ts trong thư mục src và bổ sung

```ts
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "vn"];

export default getRequestConfig(async({locale}) => {
    if(!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
```

- B4: Tạo file middleware.ts trong src và bổ sung

```ts
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
```

- B5: Tạo folder messages trong src với 2 file json là en.json và vn.json

- Trong vn.json
```json
{
    "NavbarLinks": {
      "home": "Trang chủ",
      "homeTitle": "Trang chính",
      "about": "Giới thiệu",
      "aboutTitle": "Trang giới thiệu",
      "profile": "Hồ sơ",
      "profileTitle": "Trang hồ sơ"
    },
    "HomePage": {
      "title": "Trang đích"
    },
    "AboutPage": {
      "title": "Giới thiệu"
    },
    "ProfilePage": {
      "title": "Hồ sơ"
    }
}
```

- B6: Tạo folder [locale] trong thư mục app và chuyển 2 file layout.tsx và page.tsx vào bên trong nó

- Di chuyển các file layout.tsx và page.tsx vào thư mục [locale] trong cấu trúc thư mục của Next.js có một số tác dụng quan trọng liên quan đến quản lý đa ngôn ngữ và phân chia nội dung:

1. Quản lý Đa Ngôn Ngữ:
- Tự Động Xử Lý Ngôn Ngữ: Thư mục [locale] cho phép bạn tổ chức các trang và layout theo ngôn ngữ. Next.js có thể sử dụng thông tin trong thư mục [locale] để phục vụ các nội dung khác nhau dựa trên ngôn ngữ của người dùng.
- Cấu Trúc Đường Dẫn Động: Việc sử dụng cú pháp [locale] trong tên thư mục cho phép tạo các đường dẫn động, chẳng hạn như /en/ cho tiếng Anh và /vn/ cho tiếng Việt. Điều này giúp dễ dàng quản lý các phiên bản ngôn ngữ khác nhau của ứng dụng.

2. Cấu Trúc và Tổ Chức Dự Án:
- Tách Biệt Nội Dung Theo Ngôn Ngữ: Di chuyển layout.tsx và page.tsx vào trong thư mục [locale] giúp tách biệt nội dung và giao diện của ứng dụng theo ngôn ngữ cụ thể. Điều này có thể giúp dễ dàng quản lý và bảo trì các phiên bản ngôn ngữ khác nhau của trang web.
- Tăng Tính Tổ Chức: Việc phân loại các file theo ngôn ngữ giúp giữ cho dự án có cấu trúc rõ ràng hơn và dễ dàng tìm kiếm, làm việc với các phần của dự án liên quan đến từng ngôn ngữ cụ thể.

3. Cấu Hình Dynamic Routes:
- Hỗ Trợ Routing Động: Next.js sẽ sử dụng cấu trúc thư mục [locale] để tự động cấu hình routing cho các trang dựa trên ngôn ngữ. Điều này có nghĩa là bạn không cần phải cấu hình routing tĩnh cho từng ngôn ngữ, giúp đơn giản hóa việc phát triển và duy trì ứng dụng.

4. Tối Ưu Hóa SEO:
- Tối Ưu Hóa Đối Với Ngôn Ngữ: Việc tổ chức nội dung theo ngôn ngữ giúp cải thiện SEO cho các phiên bản ngôn ngữ khác nhau của trang web, giúp các công cụ tìm kiếm hiểu và phân loại nội dung theo ngôn ngữ cụ thể.

- Khi người dùng truy cập /en/, Next.js sẽ tìm và sử dụng nội dung từ app/en/layout.tsx và app/en/page.tsx.
- Khi người dùng truy cập /vn/, Next.js sẽ tìm và sử dụng nội dung từ app/vn/layout.tsx và app/vn/page.tsx.

- Việc cấu hình như thế này giúp cung cấp một trải nghiệm người dùng nhất quán và dễ dàng quản lý cho nhiều ngôn ngữ.

- B7: Sửa lại layout.tsx

- Ban đầu

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- Lúc sau

```tsx
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="mx-auto max-w-4xl h-screen">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## Như vậy khi chạy app nó sẽ tự động vào route: http://localhost:3000/en do ta đã set-up ở middleware

- B8: Sửa lại Home page dựa vào file json đã có

```tsx
import { useTranslations } from "next-intl";

export default function Home() {

  const t = useTranslations("HomePage");

  return (
    <div className="flex w-full items-center justify-center">
      <div className="text-3xl font-bold mt-20">{t("title")}</div>
    </div>
  );
}
```

- B10: Quay lại browser để kiểm tra đã hoạt động chưa

- http://localhost:3000/vn
- http://localhost:3000/en

- B11: Tạo folder components trong src và file Navbar.tsx trong đó

- B12: Sửa lại file layout.tsx

```tsx
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="mx-auto max-w-4xl h-screen">
            <Navbar locale={locale}/>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- B13: Sửa lại file Navbar đã tạo

```tsx
"use client"

import React from 'react'

const Navbar = ({locale}: { locale: string }) => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar
```

## Sử dụng pathName

- Nếu ta có đường dẫn http://localhost:3000/en

```tsx
console.log("pathname", pathname); // pathname /en
```

## Ta có đoạn mã

```tsx
const pathname = usePathname();

const path = pathname.split("/").slice(2).join("/");
```

- Dòng mã const path = pathname.split("/").slice(2).join("/"); sử dụng các phương pháp chuỗi và mảng để xử lý và tinh chỉnh đường dẫn hiện tại. Hãy phân tích từng phần của dòng mã này:

- Phân Tích
1. pathname.split("/"):
- Phương pháp split("/") chia chuỗi pathname thành một mảng các phần tử, sử dụng dấu / làm dấu phân cách.
- Ví dụ: Nếu pathname là /en/about/profile, thì pathname.split("/") sẽ trả về mảng ["", "en", "about", "profile"].

2. .slice(2):
- Phương pháp slice(2) lấy một phần của mảng từ chỉ số 2 đến hết mảng.
- Điều này bỏ qua các phần tử trước chỉ số 2 trong mảng, bao gồm dấu / rỗng và phần tử đầu tiên (trong trường hợp này, "en").
- Ví dụ: Với mảng ["", "en", "about", "profile"], slice(2) sẽ trả về ["about", "profile"].

3. .join("/"):
- Phương pháp join("/") nối các phần tử của mảng thành một chuỗi duy nhất, sử dụng dấu / làm dấu phân cách giữa các phần tử.
- Ví dụ: Với mảng ["about", "profile"], join("/") sẽ trả về chuỗi "about/profile".

## Kết Quả
- Kết quả của dòng mã này là đường dẫn hiện tại (pathname) sau khi loại bỏ phần đầu của nó, cụ thể là hai phần tử đầu tiên trong mảng phân tách bởi dấu /.

- B14: Sửa lại Navbar lần 2:

```tsx
"use client"

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

const Navbar = ({locale}: { locale: string }) => {

    const t = useTranslations("NavbarLinks");
    const pathname = usePathname();
    const router = useRouter();

    console.log("pathname", pathname); // pathname /en
    

    const handleLanguageChange = (e:  ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value as string;
        const path = pathname.split("/").slice(2).join("/");
        router.push(`/${newLocale}/${path}`);
    }

    return (
        <div className='w-full flex justify-between border-b py-4'>
            <div className='flex gap-4 items-center text-lg'>
                <Link href={`/${locale}/`}>{t("home")}</Link>
                <Link href={`/${locale}/about`}>{t("about")}</Link>
                <Link href={`/${locale}/about/profile`}>{t("profile")}</Link>
            </div>
            <select value={locale} onChange={handleLanguageChange} className='rounded-md px-4 py-2 bg-transparent hover:outline-none focus:outline-none'>
                <option value="en">EN</option>
                <option value="vn">VN</option>
            </select>
        </div>
    )
}

export default Navbar
```

- B15: Giúp các route khác như about cũng dịch được bằng cách tạo folder about trong thư mục [locale]

- B16: Khởi tạo Metadata trong home page

```tsx
import { getMessages } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages: any = await getMessages({locale});
  const title = messages.NavbarLinks.homeTitle;

  return {
    title
  }
}
```


