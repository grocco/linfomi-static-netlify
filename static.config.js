import React from 'react';

const fs = require('fs')
const klaw = require('klaw')
const path = require('path')
const matter = require('gray-matter')

function getData () {
  const items = [];
  const membs = [];
  // Walk ("klaw") through posts directory and push file paths into items array //
  const getItems = () => new Promise(resolve => {
    // Check if posts directory exists //
    if (fs.existsSync('./src/data/posts')) {
      klaw('./src/data/posts')
        .on('data', item => {
          // Filter function to retrieve .md files //
          if (path.extname(item.path) === '.md') {
            // If markdown file, read contents //
            const data = fs.readFileSync(item.path, 'utf8')
            // Convert to frontmatter object and markdown content //
            const dataObj = matter(data)
            // Create slug for URL //
            dataObj.data.slug = dataObj.data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            // Remove unused key //
            delete dataObj.orig
            // Push object into items array //
            items.push(dataObj)
          }
        })
        .on('error', e => {
          console.error(e)
        })
        .on('end', () => {
          // Resolve promise for async getRoutes request //
          // posts = items for below routes //
          resolve(items)
        })
    } else {
      // If src/posts directory doesn't exist, return items as empty array //
      resolve(items)
    }
  });
  const getMembs = () => new Promise(resolve => {
    // Check if posts directory exists //
    if (fs.existsSync('./src/data/members')) {
      klaw('./src/data/members')
        .on('data', item => {
          // Filter function to retrieve .md files //
          if (path.extname(item.path) === '.md') {
            // If markdown file, read contents //
            const data = fs.readFileSync(item.path, 'utf8')
            // Convert to frontmatter object and markdown content //
            const dataObj = matter(data)
            // Create slug for URL //
            dataObj.data.slug = dataObj.data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            // Remove unused key //
            delete dataObj.orig
            // Push object into items array //
            membs.push(dataObj)
          }
        })
        .on('error', e => {
          console.error(e)
        })
        .on('end', () => {
          // Resolve promise for async getRoutes request //
          // posts = items for below routes //
          resolve(membs)
        })
    } else {
      // If src/posts directory doesn't exist, return items as empty array //
      resolve(membs)
    }
  });
  return Promise.all([getItems(), getMembs()]);
}

export default {
  Document: class CustomHtml extends React.Component {
    render() {
      const { Html, Head, Body, children, /* renderMeta */} = this.props;
      return (
        <Html>
          <Head>
            <script id="stripe-js" src="https://js.stripe.com/v3/" async />
            {/* {renderMeta.styleTags} */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Foundation IOR</title>
          </Head>
          <Body >
            {children}
          </Body>
        </Html>
      )  
    }
  },
  getSiteData: () => ({
    title: 'React Static with Netlify CMS',
  }),
  getRoutes: async () => {
    const [posts, members] = await getData()
    return [
      {
        path: '/',
        component: 'src/components/connected/pages/Home',
        getData: () => ({
          pageSlug: 'home' 
        })
      },
      {
        path: '/home',
        component: 'src/components/connected/pages/Home',
        getData: () => ({
          pageSlug: 'home' 
        })
      },
      {
        path: '/history',
        component: 'src/components/connected/pages/History',
        getData: () => ({
          pageSlug: 'history' 
        })
      },
      {
        path: '/president',
        component: 'src/components/connected/pages/President',
        getData: () => ({
          pageSlug: 'president' 
        })
      },
      {
        path: '/donations',
        component: 'src/components/connected/pages/Donations',
        getData: () => ({
          pageSlug: 'donations' 
        })
      },
      {
        path: '/council',
        component: 'src/components/connected/pages/Council',
        getData: () => ({
          pageSlug: 'council',
          members,
        })
      },
      {
        path: '/contact/success',
        component: 'src/components/connected/pages/Contact',
        getData: () => ({
          pageSlug: 'contact',
          success: true
        })
      },
      {
        path: '/contact',
        component: 'src/components/connected/pages/Contact',
        getData: () => ({
          pageSlug: 'contact',
        })
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  webpack: (config, { stage }) => {
    if (stage === 'prod') {
      config.entry = ['babel-polyfill', config.entry]
    } else if (stage === 'dev') {
      config.entry = ['babel-polyfill', ...config.entry]
    }
    return config
  },
}
