function CreateAccount() {
  const [update, setUpdate] = React.useState(true);
  const ctx = React.useContext(UserContext);

  const [value, setValue] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  function handle() {
    console.log(value.name, value.email, value.password);
    const url = `/account/create/${value.name}/${value.email}/${value.password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();
    props.setShow(false);
  }

  const [error, setError] = React.useState({});
  const validation = (value) => {
    let error = {};
    if (!value.name.match(/^[a-zA-Z]/)) {
      error.name = "Numbers not accepted!";
    }
    if (!value.name) {
      error.name = "Name is required!";
    }
    if (!value.email) {
      error.email = "Email is required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      error.email = "Email is invalid!";
    }
    if (!value.password) {
      error.password = "Password is required!";
    } else if (value.password.length < 6) {
      error.password = "Password must be more than six character!";
    }
    return error;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validation(value));
  };

  const submit = () => {
    if (!value.name.match(/^[a-zA-Z]/)) return;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) return;
    if (value.password.length < 6) return;
    alert("Account Successfully Created");
    ctx.users.push({
      name: value.name,
      email: value.email,
      password: value.password,
      balance: 0
    });
    setUpdate(false);
    handle();
  };

  function pageRefresh() {
    setValue("");
    setUpdate(true);
  }

  return (
    <>
      <div class="container">
        {update ? (
          <>
            <div className="account">
              <div class="card">
                <div class="bg-primary card-headera">Create User Account</div>
                <div class="card-body">
                  <form onSubmit={handleSubmit}>

                    <div class="form-floating mb-3">
                      <input type="type" class="form-control" name="name" id="floatingInput" placeholder="Enter Your Name" value={value.name} onChange={handleChange} />
                      <label for="floatingInput">Name</label>
                      {error.name && <p className="error">{error.name}</p>}
                    </div>

                    <div class="form-floating mb-3">
                      <input type="email" class="form-control" name="email" id="floatingInput" placeholder="Enter Your Email" value={value.email} onChange={handleChange} />
                      <label for="floatingInput">Email Address</label>
                      {error.email && <p className="error">{error.email}</p>}
                    </div>

                    <div class="form-floating">
                      <input type="password" class="form-control" name="password" id="floatingPassword" placeholder="Enter Password" value={value.password} onChange={handleChange} />
                      <label for="floatingPassword">Password</label>
                      {error.password && (
                        <p className="error">{error.password}</p>
                      )}
                    </div><br/>
                    <button
                      class="btnstyle"
                      type="submit"
                      onClick={submit}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h5>Successfully Account Created</h5>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={pageRefresh}
            >
              Add another account
            </button>
          </>
        )}
      </div>
    </>
  );
}
