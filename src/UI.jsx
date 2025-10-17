import "./UI.css";

export default function UI() {
  return (
    <>
      {/* Background layer */}
      <div className="ui-background" />

      {/* Hero Section */}
      <section className="ui-section hero-section">
        <h1>Cameron Parker</h1>
        <p>Artist / Designer</p>
      </section>





      {/* Closing / Contact Section */}
      <section className="ui-section closing">
        <div>
          <h2>Contact</h2>
          <p>Email: cparkere@gmail.com</p>
        </div>
      </section>
    </>
  );
}
