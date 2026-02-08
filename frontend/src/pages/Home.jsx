export default function Home() {
  return (
    <div className="space-y-10 py-6">
      <section>
        <h1 className="text-4xl font-bold">
          Custom Printing Made Easy
        </h1>
        <p className="text-gray-600">
          Flex banners, vinyl prints, LED boards & more
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">
          Popular Products
        </h2>
        <ul className="list-disc ml-5">
          <li>Flex Banner</li>
          <li>Vinyl Print</li>
          <li>LED Board</li>
        </ul>
      </section>
    </div>
  );
}
