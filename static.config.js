import React from "react";

const fs = require("fs");
const klaw = require("klaw");
const path = require("path");
const matter = require("gray-matter");
const showdown = require("showdown");

function getData() {
  const membs = [];
  const scMembs = [];
  const converter = new showdown.Converter();
  const getMembs = () =>
    new Promise(resolve => {
      // Check if posts directory exists //
      if (fs.existsSync("./src/data/members")) {
        klaw("./src/data/members")
          .on("data", item => {
            // Filter function to retrieve .md files //
            if (path.extname(item.path) === ".md") {
              // If markdown file, read contents //
              const data = fs.readFileSync(item.path, "utf8");
              // Convert to frontmatter object and markdown content //
              const dataObj = matter(data);
              ["bio", "bio-it", "bio-fr", "bio-de"].forEach(
                field => (dataObj.data[field] = converter.makeHtml(dataObj.data[field]))
              );
              // Create slug for URL //
              dataObj.data.slug = dataObj.data.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
              // Remove unused key //
              delete dataObj.orig;
              // Push object into items array //
              membs.push(dataObj);
            }
          })
          .on("error", e => {
            console.error(e);
          })
          .on("end", () => {
            // Resolve promise for async getRoutes request //
            // posts = items for below routes //
            resolve(membs);
          });
      } else {
        // If src/posts directory doesn't exist, return items as empty array //
        resolve(membs);
      }
    });
  const getSCMembs = () =>
    new Promise(resolve => {
      // Check if posts directory exists //
      if (fs.existsSync("./src/data/scientific-committee")) {
        klaw("./src/data/scientific-committee")
          .on("data", item => {
            // Filter function to retrieve .md files //
            if (path.extname(item.path) === ".md") {
              // If markdown file, read contents //
              const data = fs.readFileSync(item.path, "utf8");
              // Convert to frontmatter object and markdown content //
              const dataObj = matter(data);
              ["bio", "bio-it", "bio-fr", "bio-de"].forEach(
                field => (dataObj.data[field] = converter.makeHtml(dataObj.data[field]))
              );
              // Create slug for URL //
              dataObj.data.slug = dataObj.data.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
              // Remove unused key //
              delete dataObj.orig;
              // Push object into items array //
              scMembs.push(dataObj);
            }
          })
          .on("error", e => {
            console.error(e);
          })
          .on("end", () => {
            // Resolve promise for async getRoutes request //
            // posts = items for below routes //
            resolve(scMembs);
          });
      } else {
        // If src/posts directory doesn't exist, return items as empty array //
        resolve(scMembs);
      }
    });
  return Promise.all([getSCMembs(), getMembs()]);
}

export default {
  Document: class CustomHtml extends React.Component {
    render() {
      const { Html, Head, Body, children /* renderMeta */ } = this.props;
      return (
        <Html>
          <Head>
            <script id="stripe-js" src="https://js.stripe.com/v3/" async />
            {/* {renderMeta.styleTags} */}
            <meta charSet="UTF-8" />
            <link href="/assets/css/fonts.css" rel="stylesheet" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <title>Foundation IOR</title>
          </Head>
          <Body>
            <div
              id="initial-loading"
              style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0, background: "#000", zIndex: 9999999 }}
            >
              <img
                width={220}
                height={220}
                src="/assets/foundation_ior.png"
                style={{
                  width: 220,
                  height: 220,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)"
                }}
              />
            </div>
            {children}
          </Body>
        </Html>
      );
    }
  },
  getSiteData: async () => {
    const [scMembers, members] = await getData();
    return {
      title: "Foundation IOR",
      scMembers,
      members
    };
  },
  getRoutes: () => [
    {
      path: "/",
      component: "src/components/version_2/connected/pages/Intro",
      getData: () => ({
        pageSlug: "intro"
      })
    },
    {
      path: "/intro",
      component: "src/components/version_2/connected/pages/Intro",
      getData: () => ({
        pageSlug: "intro"
      })
    },
    {
      path: "/home",
      component: "src/components/version_2/connected/pages/Home",
      getData: () => ({
        pageSlug: "home"
      })
    },

    {
      path: "/scientific",
      component: "src/components/version_2/connected/pages/Home",
      getData: () => ({
        pageSlug: "scientific"
      })
    },

    {
      path: "/exmembers",
      component: "src/components/version_2/connected/pages/Home",
      getData: () => ({
        pageSlug: "exmembers"
      })
    },

    {
      path: "/foundation",
      component: "src/components/version_2/connected/pages/Home",
      getData: () => ({
        pageSlug: "foundation"
      })
    },

    {
      path: "/members",
      component: "src/components/version_2/connected/pages/Home",
      getData: () => ({
        pageSlug: "members"
      })
    },

    {
      path: "/ior",
      component: "src/components/version_2/connected/pages/Home",
      getData: () => ({
        pageSlug: "ior"
      })
    },

    {
      path: "/ielsg",
      component: "src/components/version_2/connected/pages/Home",
      getData: () => ({
        pageSlug: "ielsg"
      })
    },

    {
      path: "/icml",
      component: "src/components/version_2/connected/pages/Home",
      getData: () => ({
        pageSlug: "icml"
      })
    },
    {
      path: "/history",
      component: "src/components/version_2/connected/pages/History",
      getData: () => ({
        pageSlug: "history"
      })
    },
    {
      path: "/president",
      component: "src/components/version_2/connected/pages/President",
      getData: () => ({
        pageSlug: "president"
      })
    },
    {
      path: "/donations",
      component: "src/components/version_2/connected/pages/Donations",
      getData: () => ({
        pageSlug: "donations"
      })
    },
    {
      path: "/donations-and-contacts",
      component: "src/components/version_2/connected/pages/Donations",
      getData: () => ({
        pageSlug: "donations"
      })
    },
    {
      path: "/council",
      component: "src/components/version_2/connected/pages/Council",
      getData: () => ({
        pageSlug: "council"
      })
    },
    {
      path: "/scientific-committee",
      component: "src/components/version_2/connected/pages/Council",
      getData: () => ({
        pageSlug: "scientific-committee",
        scientificCommittee: true
      })
    },
    {
      path: "/contact/success",
      component: "src/components/version_2/connected/pages/Contact",
      getData: () => ({
        pageSlug: "contact",
        success: true
      })
    },
    {
      path: "/contact",
      component: "src/components/version_2/connected/pages/Contact",
      getData: () => ({
        pageSlug: "contact"
      })
    },
    {
      is404: true,
      component: "src/containers/404"
    }
  ],
  webpack: (config, { stage }) => {
    if (stage === "prod") {
      config.entry = ["babel-polyfill", config.entry];
    } else if (stage === "dev") {
      config.entry = ["babel-polyfill", ...config.entry];
    }
    return config;
  }
};
