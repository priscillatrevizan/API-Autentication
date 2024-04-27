require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// Configurar express para usar UTF-8
app.use(express.json({ charset: "utf-8" }));

//Config json response
app.use(express.json());

//Models
const User = require("./models/User");

//Open Route - Public Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "API Logada" });
});

//Private Route
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  //check if user exists

  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "usuário não encontrado!" });
  }

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ msg: "Token Invalido!" });
  }
}

//Register User
app.post("/auth/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  //Validations

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ msg: "Informe todos os campos corretamente" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "As senhas não coincidem" });
  }

  //check is user exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res
      .status(400)
      .json({ msg: "E-mail já cadastrado. Por favor, utilize outro email!" });
  }

  //create password
  const salt = await bcrypt.genSalt(12);
  const paswwordHash = await bcrypt.hash(password, salt);

  //create user
  const user = new User({
    name,
    email,
    password: paswwordHash,
  });

  try {
    await user.save();

    res.status(201).json({ msg: "Cadastro realizado com sucesso" });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ msg: "Houve um erro no servidor. Por favor, tente mais tarde!" });
  }
});

//Login User
app.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Login inválido" });
  }

  // Verificar se o usuário existe
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ msg: "Login inválido" });
  }

  // Verificar se a senha está correta
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ msg: "Login inválido" });
  }

  // Gerar token JWT
  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({}, secret);

    // Retornar o token, id, nome e email do usuário
    res.status(200).json({
      tokenJWT: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Erro ao gerar token JWT:", error);
    res.status(500).json({
      msg: "Houve um erro ao autenticar. Por favor, tente novamente mais tarde!",
    });
  }
});

//Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8fucoyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("API Conectada ao BD com sucesso");
  })
  .catch((err) => console.log(err));
app.listen(3000);
