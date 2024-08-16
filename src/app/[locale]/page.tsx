import { useTranslations } from "next-intl"; // useTranslations là một hook từ thư viện next-intl, được sử dụng để lấy các thông điệp đã bản địa hóa cho component.
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

export default function Home() {

  /**
   * useTranslations("HomePage") trả về một hàm t mà bạn có thể sử dụng để lấy các thông điệp từ file bản địa hóa dựa trên tên namespace "HomePage".
   */
  const t = useTranslations("HomePage");

  return (
    <div className="flex w-full items-center justify-center">
      <div className="text-3xl font-bold mt-20">{t("title")}</div>
    </div>
  );
}
