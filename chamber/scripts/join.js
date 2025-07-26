document.addEventListener('DOMContentLoaded', () => {
  const tsField = document.getElementById('timestamp');
  if (tsField) {
    tsField.value = new Date().toISOString();
  }

  const yearEl = document.getElementById('currentyear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const modEl = document.getElementById('lastModified');
  if (modEl) {
    modEl.textContent = `Last Modified: ${document.lastModified}`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Timestamp & Footer Logic
  const tsField = document.getElementById('timestamp');
  if (tsField) {
    tsField.value = new Date().toISOString();
  }

  const yearEl = document.getElementById('currentyear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const modEl = document.getElementById('lastModified');
  if (modEl) {
    modEl.textContent = `Last Modified: ${document.lastModified}`;
  }

  // Membership Modal Logic
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  document.querySelectorAll('dialog [data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dialog = btn.closest('dialog');
      if (dialog) dialog.close();
    });
  });

  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', e => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    });
  });
});
