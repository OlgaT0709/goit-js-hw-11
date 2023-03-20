import Notiflix from 'notiflix';

class Notifier {
  constructor() {
    Notiflix.Notify.init({
      width: '50%',
      opacity: 1,
      fontSize: '14px',
      position: 'center-top',
      timeout: 2000,
      useIcon: false,
      borderRadius: '3px',
      info: {
      background: '#4c4cff',
      textColor: '#fff',
      },
      warning: {
      background: '#ffa500',
      textColor: '#333',
      },
      success: {
      background: '#00b300',
      textColor: '#fff',
      },
      error: {
      background: '#ff3333',
      textColor: '#fff',
      },
    });
  }

  success(message) {
    Notiflix.Notify.success(message);
  }

  warning(message) {
    Notiflix.Notify.warning(message);
  }

  info(message) {
    Notiflix.Notify.info(message);
  }

  error(message) {
    Notiflix.Notify.failure(message);
  }
}

export default new Notifier();
