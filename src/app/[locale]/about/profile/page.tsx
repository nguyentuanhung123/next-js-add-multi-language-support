import { useTranslations } from "next-intl"; 
import { getMessages } from "next-intl/server";

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const messages: any = await getMessages({locale});
    const title = messages.NavbarLinks.profileTitle;
  
    return {
      title
    }
}

const ProfilePage = () => {

    const t = useTranslations("ProfilePage");

    return (
        <div className="flex w-full items-center justify-center">
            <div className="text-3xl font-bold mt-20">{t("title")}</div>
        </div>
    )
}

export default ProfilePage