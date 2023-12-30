import React, { Component } from "react"
import axios from "axios"
import "bulma/css/bulma.min.css"
import "./index.css"
import { Fade, Bounce, Slide } from "react-awesome-reveal"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ReactFormInputValidation from "react-form-input-validation"
import Typist from "react-typist"
import slugify from "slugify"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Helmet, HelmetProvider } from "react-helmet-async"
import sitedata from "./config.json"

class RetrieveList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        name: "",
      },
      errors: {},
      isLoading: true,
      persons: [],
    }
    this.form = new ReactFormInputValidation(this)
    this.form.useRules({
      name: "required",
    })
  }
  componentDidMount() {
    if (document.getElementById("btnSignUp") != null) {
      document.getElementById("btnSignUp").addEventListener("click", e => {
        const name = document.getElementById("name").value
        /* eslint eqeqeq: 0 */
        if (name == 0) {
          console.log("Empty Title or Message")
          toast.error("🤖 Empty Name", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            closeButton: false,
          })
          return false
        }
        //const users = encodeURIComponent(name)
        const users = slugify(name, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: false,
          strict: false,
        })
        window.location.href = "?name=" + users
      })
    }
    const GET_USER = new URL(window.location.href).searchParams.get("name")
    axios.get(sitedata.apiurl + GET_USER).then(res => {
      const wishes = res.data
      toast.success("😊 \n" + wishes[0].content, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      })
      console.log(wishes[0].content)
      this.setState({ isLoading: false, persons: wishes })
    })
  }
  PageToast() {
    toast.dark("📝 Copied", {
      position: "top-right",
      autoClose: 900,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      closeButton: false,
    })
  }

  render() {
    const wishername = this.state.persons.map(person => person.content)
    const sharetext = encodeURIComponent(
      wishername + " Happy New Year wishes for u " + window.location.href
    )
    const Whatsappshare = "https://api.whatsapp.com/send?text=" + sharetext
    const Telegramshare =
      "https://telegram.me/share/url?url=" +
      window.location.href +
      "&text=" +
      wishername +
      " Valentines day wishes For you"

    return (
      <section className="section">
        <HelmetProvider>
          <Helmet>
            <title>{`${
              wishername + " Happy New Year wishes for u 💗"
            }`}</title>
            <meta
              property="og:title"
              content={`${wishername + " Happy New Year wishes for u 🎇 "}`}
            />
            <meta
              property="og:site_name"
              content={`${wishername + " Happy New Year wishes for u 🎇 "}`}
            />
            <meta
              name="twitter:title"
              content={`${wishername + " Happy New Year wishes for u 🎇 "}`}
            />
            <link rel="canonical" href={window.location.href} />
            <meta name="twitter:url" content={window.location.href} />
            <meta property="og:url" content={window.location.href} />
            <script type="application/ld+json">{`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "publisher": {
                "@type": "Organization",
                "name": "${wishername} Happy New Year wishes for u 🎇 ",
                "url": "${window.location.href}",
                "logo": {
                  "@type": "ImageObject",
                  "url": "${sitedata.siteurl}/logo.png",
                  "width": 60,
                  "height": 60
                }
              },
              "url": "${window.location.href}",
              "image": {
                "@type": "ImageObject",
                "url": "${sitedata.siteurl}/sanwishes-cover.png",
                "width": 1280,
                "height": 720
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "${window.location.href}"
              },
              "description": "Happy New Year wishes for u 🎇 ."
            }
            `}</script>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-EHEB5DM5VW"
            ></script>
            <script>
              {`
              if(true) {
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
          
               gtag('config', 'G-EHEB5DM5VW', {
                 'page_title' : '${wishername} Happy New Year wishes for u 🎇 ',
                 'page_location': '${window.location.href}'
               });
              }
            `}
            </script>
          </Helmet>
        </HelmetProvider>
        <div className="container content">
          <div className="columns is-centered">
            <div className="column is-half">
              <Slide triggerOnce>
                <br />
                <h1 className="title is-5 has-text-warning has-text-centered">
                  <Typist
                    avgTypingDelay={40}
                    startDelay={1800}
                    cursor={{ hideWhenDone: true }}
                  >
                    {" "}
                    Happy New Year 🎇 
                  </Typist>
                </h1>
                <br />
                <Bounce>
                  <p className="has-text-centered">
                    {this.state.isLoading ? "" : "🎇 "} {wishername}{" "}
                    {this.state.isLoading ? "" : "🎇 "}
                  </p>
                </Bounce>
              </Slide>
              <br />
              <Slide triggerOnce>
                <Fade>
                  <img src="./new.svg" alt="San Wishes" loading="lazy"></img>
                </Fade>
              </Slide>
              <br />
              <Slide triggerOnce>
                <div className="notification has-text-weight-bold read-more">
                  <p className="has-text-weight-bold has-text-left">
                    Wishing You.. 🎇 
                    <br />
                    <br />
                    a Happy New Year
                    <br />
                    <br />
                    with the hope that you will have
                    <br />
                    <br />
                    many blessings in the year to come.
                    <br />
                    <br />Happy New Year ! 
                  </p>
                </div>
              </Slide>
              <br />
              <br />
              <div className="notification is-warning has-text-weight-bold">
                <br />
                <h3 className="has-text-centered">Create your Own 🎇</h3>
                <div className="has-text-centered">
                  <small>Enter his or Her Name</small>
                </div>
                <br />
                <form onSubmit={this.form.handleSubmit}>
                  <div className="control">
                    <input
                      className="input"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter Name"
                      onBlur={this.form.handleBlurEvent}
                      onChange={this.form.handleChangeEvent}
                      value={this.state.fields.name}
                      data-attribute-name="Name"
                    />
                  </div>
                  <label className="error">
                    {this.state.errors.name ? this.state.errors.name : ""}
                  </label>
                  <br />
                  <button
                    id="btnSignUp"
                    className="button is-link read-random sign-button"
                    type="submit"
                  >
                    Create Wishes
                  </button>
                </form>
                <br />
              </div>
              <div className="buttons is-centered">
                <ToastContainer />
                <CopyToClipboard
                  text={window.location.href}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <button
                    className="button is-danger read-random"
                    onClick={this.PageToast}
                    disabled={this.state.isLoading}
                  >
                    📝 Copy URL
                  </button>
                </CopyToClipboard>
              </div>
              <hr />
             
              <br />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default RetrieveList
