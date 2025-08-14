export default function Home() {
  return (
    <>
      <h2 className="text-green-500">Welcom to Shop Soft</h2>
      <div>
        <h3>Have Account ? </h3>
        <a href="/login">
          {" "}
          <button className="authBtn">Login</button>
        </a>
      </div>
      <div>
        <h3>No Account? Register Here:</h3>
        <a href="/register">
          <button className="authBtn">Register</button>
        </a>
      </div>
    </>
  );
}
