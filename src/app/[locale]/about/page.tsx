import { useTranslations } from "next-intl"; 

const AboutPage = () => {

    const t = useTranslations("AboutPage");

    return (
        <div className="flex w-full items-center justify-center">
            <div className="text-3xl font-bold mt-20">{t("title")}</div>
        </div>
    )
}

export default AboutPage