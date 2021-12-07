require("dotenv").config();
const express = require("express");
const path = require('path');



const app = express();

app.set("views", "./views/pages");

app.set("view engine", "ejs");

// middleware & static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static(path.join(__dirname, 'public')));

const blogs = [
  {
    title: `Glasgow: The last best hope to fight climate change`,
    snippet: `In the foreground stands the Finnieston Crane, a lattice of girders stained by rust. Behind it are two futuristic buildings, the Armadillo auditorium and the Hydro arena`,
    body: `In the foreground stands the Finnieston Crane, a lattice of girders stained by rust. Behind it are two futuristic buildings, the Armadillo auditorium and the Hydro arena, which will host world leaders at the COP26 climate summit. This view of Glasgow shows the old and the new; the former industrial powerhouse transforming itself into a modern, vibrant city.... Full Read: https://www.bbc.co.uk/news/extra/e8vkjmttbw/glasgow-scotland-the-last-best-hope-to-fight-climate-change`,
    id: 0,
  },
  {
    title: `US lawmakers approve $1tn in infrastructure spending`,
    snippet: `The US Congress has passed a landmark $1tn (£741bn) infrastructure spending package, delivering a major domestic win to President Joe Biden`,
    body: `spending package, delivering a major domestic win to President Joe Biden. Negotiations over the sweeping public works bill - which passed the House of Representatives with 228-206 vote - created a bitter split among Democrats. Meanwhile the House is moving forward with a more ambitious social spending bill favoured by liberal lawmakers. The infrastructure package now heads to Mr Biden's desk to be signed into law. Billed as a "once-in-a-generation" spending measure, the infrastructure legislation proposes $550bn in direct federal expenditure to upgrade highways, roads and bridges, and to modernise city transit systems and passenger rail networks.`,
    id: 1,
  },
  {
    title: `Zuckerberg's metaverse: Lessons from Second Life`,
    snippet: `By Joe Tidy Cyber reporter...`,
    body: `This week, I travelled back in time to visit the future. It has been about 10 years since I first entered the virtual world of Second Life, arguably the internet's first attempt at what every tech giant is now racing to build: the so-called metaverse. The term metaverse was coined in the 1990s in a science-fiction novel, Snow Crash, where it served as a virtual-reality successor to the internet, where people live large portions of their lives in virtual environments. Second Life peaked in the late 2000s with millions of users and hundreds of excitable headlines about people devoting hours of their daily lives to live digitally. Since then, I assumed it had died a slow and quiet death. But how wrong I was. The platform seems to have a small, loyal and potentially growing community of "residents", as they call themselves, logging on to experience what our metaverse future could look like.`,
    id: 2,
  },
  {
    title: `As winter looms, reports of starvation in North Korea`,
    snippet: `The warnings are stark and coming from inside and outside of North Korea. Defectors based in South Korea have told us that their families in the North are going hungry. There is a concern as winter approaches that the most vulnerable will starve`,
    body: `"Problems such as more orphan children on the streets and death by starvation are continuously being reported," said Lee Sang Yong, editor in chief of the Daily NK, which has sources in North Korea. "The lower classes in North Korea are suffering more and more," as food shortages are worse than expected, Mr Lee said. Getting information out of North Korea is increasingly difficult. The border has been closed since January last year to prevent the spread of Covid-19 from China. Even getting messages out of the country to family and friends who have defected to South Korea comes at a huge risk. Anyone caught with an unauthorised mobile phone could be thrown into a labour camp. And yet some still try to send letters or voice mail via text to their loved ones and to publications in Seoul. Through these sources, some of which have to remain anonymous, we have tried to build a picture of what is going on. Contact Us`,
    id: 3,
  },
];

// app.get("/", (req, res) => {
//   console.log("GET", req.url);
//   res.status(200).render("home", { title: "Home", blogs });
// });

// app.get("/about", (req, res) => {
//   console.log("GET", req.url);
//   res.status(200).render("about", { title: "About" });
// });




// app.get("/create", (req, res) => {
//   console.log("GET", req.url);
//   res.status(200).render("create", { title: "Create" });
// });

// app.get("/:id", (req, res, next) => {
//   console.log("GET", req.url);
//   let blog = blogs.filter((blog) => {
//     if (blog.id == req.params.id) {
//       return blog;
//     }
//   });
//   if (blog.length) {
//     res.status(200).render("details", { title: blog[0].title, blog });
//   } else {
//     next();
//   }
// });

require('./app/routes/router')(app)

// need to watch from shaun, how to setup "404 page" and "redirect page"
app.use((req, res) => {
  console.log("404: ", req.url);
  res
    .status(404)
    .render("404", { title: "404 | Not Found", msg: "404 Not Found" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Express app is connected at port ", PORT);
});
