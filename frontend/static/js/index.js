import Dashboard from '../views/Dashboard.js';
import Settings from '../views/Settings.js';
import Posts from '../views/Posts.js';
import PostView from '../views/PostView.js';

const pathToReges = (path) =>
  // path - /posts/:id
  // /posts/:id -> \\/posts\\/:id' -> '\\/posts\\/(.+)' -> '^\\/posts\\/(.+)$'
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = (match) => {
  console.log('match', match);
  const values = match.result.slice(1); // 1번째부터 그룹화한 params
  // matchAll이 반환한 이터레이터를 배열로 변환
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  console.log(values, keys);

  // [key, value] 쌍 목록을 객체로 변경해주는 메서드 fromEntries
  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

// 링크 클릭 시, 실제로 이동하지 않고 이 함수가 실행되야한다.
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  // console.log(pathToReges('/posts/:id')); // /^\/posts\/(.+)$/
  const routes = [
    { path: '/', view: Dashboard },
    { path: '/posts', view: Posts },
    // /posts/:id
    { path: '/posts/:id', view: PostView },
    { path: '/settings', view: Settings },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    console.log('path', pathToReges(route.path)); // /^\/posts\/(.+)$/
    return {
      route,
      // 배열0- 일치한 전체문자열 배열1부터 그룹화한 값들
      result: location.pathname.match(pathToReges(route.path)),
      // 일치하는 문자열이 아닌 경우 null
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname], // match의 리턴은 첫번째는 항상 전체 문자열이라서
    };
  }

  // 화면에 props 전달
  const view = new match.route.view(getParams(match));

  // 렌더링
  document.querySelector('#app').innerHTML = await view.getHtml();
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
