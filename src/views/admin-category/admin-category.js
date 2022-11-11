import * as Api from '/utils/api.js';
import { renderClientSideComponent } from '/utils/useful-functions.js';

const { role } = await Api.get('/api/users/myInfo');
if (role !== 'admin-user') {
  alert('관리자 전용 페이지입니다.');
  window.location = '/';
}

renderClientSideComponent();
