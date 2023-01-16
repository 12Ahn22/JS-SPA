// 링크 클릭 시, 실제로 이동하지 않고 이 함수가 실행되야한다.
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: '/', view: () => console.log('Viewing Dashboard') },
    { path: '/posts', view: () => console.log('Viewing posts') },
    { path: '/settings', view: () => console.log('Viewing settings') },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  match.route.view();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  // deligate 이벤트 리스너
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
