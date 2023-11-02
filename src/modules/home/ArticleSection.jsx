import { Button } from "../../components/default/Button";
import { GlimpseKnowledgeCard } from "../../components/home/GlimpseKnowledgeCard";
import { data_article } from "../../data/article";

const ArticleSection = () => {
  return (
    <section className="lg:flex flex-col gap-y-[20px] max-w-[1440px] mx-auto">
      <div className="py-10 relative">
        <div className="relative z-10">
          <h1 className="font-bold text-4xl text-center">Sekilas Ilmu</h1>
          <p className="font-medium text-xl text-center ">Informasi untuk membantu karirmu</p>
        </div>
        <img
          src="/images/home/article/article-stars.png"
          alt={"card-landing"}
          width={131}
          height={131}
          className="absolute z-0 top-0 right-0 md:right-36 lg:right-80"
          style={{
            width: "131px",
            height: "131px",
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[15px] mx-4">
        {data_article.map((item) => (
          <GlimpseKnowledgeCard key={item.id} data={item} />
        ))}
      </div>
      <div className="flex w-full justify-center items-center pt-8">
        <Button
          type="button"
          className="bg-blue-base text-white font-semibold p-3 rounded-lg w-[328px]"
        >
          Lihat Semua
        </Button>
      </div>
    </section>
  );
};

export default ArticleSection;
