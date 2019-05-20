// import store from 'domain/state/store';
import window from 'domain/window';
import i18n from 'domain/i18n';

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
};

export const initialUiState = { 
  language: 'en', 
  languages: ['en', 'it'],// 'fr', ],//'de', 'es'],
  page: 'home',
  modalTemplates, 
  currentModal: null, 
  word: "the initial word",
  showHamburgerMenu: false,
  screen: {
    width: window && window.innerWidth,
    height: window && window.innerHeight
  },
  menu: {
    current: 'menu1home',
    links: {
      menu1home: [ 
        {
          name: 'foundation',
        }, 
        {
          name: 'council'
        }, 
        {
          name: 'donations-and-contacts'
        }
      ],
      menu2foundation: [ 
        {
          name: 'foundation',
          active: true,
        }, 
        {
          name: 'ior',
          submenu: true
        }, 
        {
          name: 'ielsg',
          submenu: true
        }, 
        {
          name: 'icml',
          submenu: true
        },
        {
          name: 'council',
        }, 
        {
          name: 'donations-and-contacts'
        }
      ],
      menu2ior: [ 
        {
          name: 'link_ior',
          link: true
        },
        {
          name: 'foundation',
          active: true,
        },
        {
          name: 'ior',
          active: true,
          submenu: true
        }, 
        {
          name: 'ielsg',
          submenu: true
        }, 
        {
          name: 'icml',
          submenu: true
        },
        {
          name: 'council',
        }, 
        {
          name: 'donations-and-contacts'
        }
      ],
      menu2ielsg: [ 
        {
          name: 'link_ielsg',
          link: true
        },
        {
          name: 'foundation',
          active: true,
        },
        {
          name: 'ior',
          submenu: true
        }, 
        {
          name: 'ielsg',
          active: true,
          submenu: true
        }, 
        {
          name: 'icml',
          submenu: true
        },
        {
          name: 'council',
        }, 
        {
          name: 'donations-and-contacts'
        }
      ],
      menu2icml: [ 
        {
          name: 'link_icml',
          link: true
        },
        {
          name: 'foundation',
          active: true,
        },
        {
          name: 'ior',
          submenu: true
        }, 
        {
          name: 'ielsg',
          submenu: true
        }, 
        {
          name: 'icml',
          active: true,
          submenu: true
        },
        {
          name: 'council',
        }, 
        {
          name: 'donations-and-contacts'
        }
      ],
      menu1council: [ 
        {
          name: 'foundation',
        }, 
        {
          name: 'council',
          active: true
        },
        {
          name: 'members',
          submenu: true,
          active: true
        },
        {
          name: 'scientific',
          submenu: true
        },
        {
          name: 'donations-and-contacts'
        }
      ],

      menu1scientific: [ 
        {
          name: 'foundation',
        }, 
        {
          name: 'council',
          active: true
        }, 
        {
          name: 'members',
          submenu: true
        },
        {
          name: 'scientific',
          submenu: true,
          active: true
        },
        {
          name: 'donations-and-contacts'
        }
      ],
      menu1donations: [ 
        {
          name: 'foundation',
        }, 
        {
          name: 'council'
        }, 
        {
          name: 'donations-and-contacts',
          active: true
        }
      ],
    }
  }
}
