import { createFileRoute } from "@tanstack/react-router";
import { LightLayout } from "@/components/layouts/LightLayout";
import { LegalDoc, P, UL, Term, type LegalSection } from "@/components/legal/LegalDoc";

export const Route = createFileRoute("/consent")({
  head: () => ({
    meta: [
      { title: "Согласие на обработку данных — Live Era2" },
      { name: "description", content: "Согласие на обработку персональных данных в Live Era2." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Согласие на обработку данных — Live Era2" },
      {
        property: "og:description",
        content: "Согласие на обработку персональных данных в Live Era2.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const SECTIONS: LegalSection[] = [
  {
    id: "recipient",
    title: "Кому даётся согласие",
    content: (
      <>
        <P>
          Согласие даётся индивидуальному предпринимателю [ФИО], ИНН [номер], который выступает
          оператором персональных данных сервиса Live Era2.
        </P>
        <P>
          Согласие предоставляется свободно, своей волей и в своём интересе при регистрации в
          сервисе.
        </P>
      </>
    ),
  },
  {
    id: "data",
    title: "Перечень данных",
    content: (
      <UL
        items={[
          "адрес электронной почты и идентификатор мессенджера;",
          "имя, указанное в настройках профиля;",
          "загружаемые фотографии, в том числе изображения лица;",
          "данные о платежах и расходовании токенов.",
        ]}
      />
    ),
  },
  {
    id: "actions",
    title: "Действия с данными",
    content: (
      <>
        <P>
          Оператор вправе осуществлять сбор, запись, хранение, уточнение, использование, передачу
          привлечённым обработчикам, обезличивание, блокирование и удаление данных.
        </P>
        <P>
          Обработка ведётся смешанным способом — автоматизированно и без использования средств
          автоматизации.
        </P>
      </>
    ),
  },
  {
    id: "duration",
    title: "Срок действия согласия",
    content: (
      <P>
        Согласие действует с момента регистрации и до его отзыва, но не дольше срока, необходимого
        для целей обработки и хранения бухгалтерских документов.
      </P>
    ),
  },
  {
    id: "withdrawal",
    title: "Порядок отзыва",
    content: (
      <>
        <P>
          Отозвать согласие можно, удалив аккаунт в разделе <Term>Настройки профиля</Term> или
          направив письмо на hello@liveera.ru.
        </P>
        <P>
          После отзыва обработка прекращается, а данные удаляются, за исключением сведений, хранение
          которых обязательно по закону.
        </P>
      </>
    ),
  },
];

function Page() {
  return (
    <LightLayout>
      <LegalDoc
        title="Согласие на обработку персональных данных"
        sections={SECTIONS}
        currentHref="/consent"
      />
    </LightLayout>
  );
}
