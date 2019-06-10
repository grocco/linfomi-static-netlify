// import store from 'domain/state/store';
import window from "domain/window";
import i18n from "domain/i18n";

export const modalTemplates = {
  DONATION_START: {
    title: i18n.modal.DONATION_START.title,
    content: i18n.modal.DONATION_START.content,
    buttonLeft: null,
    buttonRight: null,
    closeable: false
  },
  DONATION_SUCCESSFUL: {
    title: i18n.modal.DONATION_SUCCESSFUL.title,
    content: i18n.modal.DONATION_SUCCESSFUL.content,
    buttonLeft: {
      text: i18n.modal.DONATION_SUCCESSFUL.buttonLeft.text,
      action: "HIDE_MODAL"
    },
    closeable: true
  },
  DONATION_FAILED: {
    title: i18n.modal.DONATION_FAILED.title,
    content: i18n.modal.DONATION_FAILED.content,
    buttonLeft: {
      text: i18n.modal.DONATION_FAILED.buttonLeft.text,
      action: "HIDE_MODAL"
    },
    closeable: true
  }
};

export const initialUiState = {
  language: "it",
  languages: ["it", "en"], // 'fr', ],//'de', 'es'],
  page: "home",
  modalTemplates,
  currentModal: null,
  word: "the initial word",
  showHamburgerMenu: false,
  screen: {
    width: !window.server && window.innerWidth,
    height: !window.server && window.innerHeight
  },
  menu: {
    current: "menu1home",
    links: {
      menu1home: [
        {
          name: "foundation"
        },
        {
          name: "ior"
          // submenu: true
        },
        {
          name: "ielsg"
          // submenu: true
        },
        {
          name: "icml"
          // submenu: true
        },
        {
          name: "council"
        },
        {
          name: "scientific",
          submenu: true
        },
        {
          name: "donations-and-contacts",
          submenu: true
        }
      ],
      menu2foundation: [
        {
          name: "foundation",
          active: true
        },
        {
          name: "ior"
          // submenu: true
        },
        {
          name: "ielsg"
          // submenu: true
        },
        {
          name: "icml"
          // submenu: true
        },
        {
          name: "foundation",
          active: true
        },
        {
          name: "council"
        },
        {
          name: "scientific",
          submenu: true
        },
        {
          name: "donations-and-contacts",
          submenu: true
        }
      ],
      menu2ior: [
        {
          name: "foundation"
          // active: true
        },
        {
          name: "link_ior",
          link: true
        },
        {
          name: "ior",
          active: true
          // submenu: true
        },
        {
          name: "ielsg"
          // submenu: true
        },
        {
          name: "icml"
          // submenu: true
        },
        {
          name: "foundation",
          active: true
        },
        {
          name: "council"
        },
        {
          name: "scientific",
          submenu: true
        },
        {
          name: "donations-and-contacts",
          submenu: true
        }
      ],
      menu2ielsg: [
        {
          name: "link_ielsg",
          link: true
        },

        {
          name: "foundation"
          // active: true
        },
        {
          name: "ior"
          // submenu: true
        },
        {
          name: "ielsg",
          active: true
          // submenu: true
        },
        {
          name: "icml"
          // submenu: true
        },
        {
          name: "foundation",
          active: true
        },
        {
          name: "council"
        },
        {
          name: "scientific",
          submenu: true
        },
        {
          name: "donations-and-contacts",
          submenu: true
        }
      ],
      menu2icml: [
        {
          name: "link_icml",
          link: true
        },

        {
          name: "foundation"
          // active: true
        },
        {
          name: "ior"
          // submenu: true
        },
        {
          name: "ielsg"
          // submenu: true
        },
        {
          name: "icml",
          active: true
          // submenu: true
        },
        {
          name: "foundation",
          active: true
        },
        {
          name: "council"
        },
        {
          name: "scientific",
          submenu: true
        },
        {
          name: "donations-and-contacts",
          submenu: true
        }
      ],
      menu1council: [
        {
          name: "foundation"
        },
        {
          name: "ior"
          // submenu: true
        },
        {
          name: "ielsg"
          // submenu: true
        },
        {
          name: "icml"
          // submenu: true
        },
        {
          name: "council",
          active: true
        },
        {
          name: "scientific",
          submenu: true
        },
        // {
        //   name: 'members',
        //   submenu: true,
        //   active: true
        // },
        // {
        //   name: 'exmembers',
        //   submenu: true
        // },
        // {
        //   name: 'scientific',
        //   submenu: true,
        // },
        {
          name: "donations-and-contacts",
          submenu: true
        }
      ],

      menu1scientific: [
        {
          name: "foundation"
        },
        {
          name: "ior"
          // submenu: true
        },
        {
          name: "ielsg"
          // submenu: true
        },
        {
          name: "icml"
          // submenu: true
        },
        // {
        //   name: 'members',
        //   submenu: true
        // },
        // {
        //   name: 'members',
        //   submenu: true
        // },
        // {
        //   name: 'exmembers',
        //   submenu: true,
        //   active: true
        // },
        // {
        //   name: 'scientific',
        //   submenu: true,
        //   active: true
        // },
        {
          name: "council"
        },
        {
          name: "scientific",
          submenu: true,
          active: true
        },
        {
          name: "donations-and-contacts",
          submenu: true
        }
      ],
      menu1donations: [
        {
          name: "foundation"
        },
        {
          name: "ior"
          // submenu: true
        },
        {
          name: "ielsg"
          // submenu: true
        },
        {
          name: "icml"
          // submenu: true
        },
        {
          name: "council"
        },
        {
          name: "scientific",
          submenu: true
        },
        {
          name: "donations-and-contacts",
          submenu: true,
          active: true
        }
      ]
    }
  }
};
