
export default class AdminServiceClient {
  deleteSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId;
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }

  updateSection(sectionId, courseId, name, seats) {
    const section = {courseId, name, seats};
    return fetch('http://localhost:4000/api/section/' + sectionId, {
      method: 'put',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
