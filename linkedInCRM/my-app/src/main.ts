

import './style.css';
import { DB, type Contact } from './db';

function createModal(): HTMLElement {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';

  modal.innerHTML = `
    <div class="bg-white rounded p-6 w-96 shadow">
      <h2 class="text-xl font-bold mb-4">Add Contact</h2>
      <form id="contactForm" class="space-y-3">
        <input type="text" id="name" placeholder="Name" class="w-full border p-2 rounded" required />
        <input type="text" id="role" placeholder="Role" class="w-full border p-2 rounded" required />
        <input type="url" id="profileUrl" placeholder="LinkedIn Profile URL" class="w-full border p-2 rounded" required />
        <textarea id="notes" placeholder="Notes" class="w-full border p-2 rounded"></textarea>
        <div class="flex justify-end space-x-2">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
          <button type="button" id="cancel" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  `;

  return modal;
}

function setupModalHandlers(modal: HTMLElement) {
  const form = modal.querySelector('#contactForm') as HTMLFormElement;
  const cancel = modal.querySelector('#cancel') as HTMLButtonElement;

  cancel.onclick = () => {
    modal.remove();
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    const contact: Contact = {
      id: Date.now().toString(),
      name: (form.querySelector('#name') as HTMLInputElement).value,
      role: (form.querySelector('#role') as HTMLInputElement).value,
      profileUrl: (form.querySelector('#profileUrl') as HTMLInputElement).value,
      notes: (form.querySelector('#notes') as HTMLTextAreaElement).value
    };
    await DB.addContact(contact);
    modal.remove();
    renderContacts();
  };
}

// --- Message Template Modal ---
function createTemplateModal(): HTMLElement {
  const modal = document.createElement('div');
  modal.id = 'templateModal';
  modal.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';

  modal.innerHTML = `
    <div class="bg-white rounded p-6 w-96 shadow">
      <h2 class="text-xl font-bold mb-4">Add Message Template</h2>
      <form id="templateForm" class="space-y-3">
        <input type="text" id="title" placeholder="Template Title" class="w-full border p-2 rounded" required />
        <textarea id="body" placeholder="Template Body" class="w-full border p-2 rounded" required></textarea>
        <div class="flex justify-end space-x-2">
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
          <button type="button" id="cancelTemplate" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  `;
  return modal;
}

function setupTemplateModalHandlers(modal: HTMLElement) {
  const form = modal.querySelector('#templateForm') as HTMLFormElement;
  const cancel = modal.querySelector('#cancelTemplate') as HTMLButtonElement;

  cancel.onclick = () => {
    modal.remove();
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    const template = {
      id: Date.now().toString(),
      title: (form.querySelector('#title') as HTMLInputElement).value,
      body: (form.querySelector('#body') as HTMLTextAreaElement).value,
      createdAt: new Date().toISOString()
    };
    await DB.addTemplate(template);
    modal.remove();
    renderMessageTemplates();
  };
}

async function renderContacts() {
  const contacts = await DB.getContacts();
  const container = document.createElement('div');
  container.className = 'p-4 space-y-2';

  const addButton = document.createElement('button');
  addButton.className = 'mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700';
  addButton.textContent = 'Add Contact';
  addButton.onclick = () => {
    const modal = createModal();
    setupModalHandlers(modal);
    document.body.appendChild(modal);
  };
  container.appendChild(addButton);

  contacts.forEach((contact) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded shadow p-3 border';

    card.innerHTML = `
      <h2 class="font-bold text-blue-600">${contact.name}</h2>
      <p class="text-sm">${contact.role}</p>
      <a href="${contact.profileUrl}" target="_blank" class="text-xs text-blue-500 underline mt-1 block">${contact.profileUrl}</a>
      ${contact.notes ? `<p class="text-xs text-gray-400 mt-1">${contact.notes}</p>` : ''}
    `;

    container.appendChild(card);
  });

  // document.body.innerHTML = '';
  const element = document.getElementById('contact-data');
  if (element) {
    element.innerHTML = '';
    element.appendChild(container);
  }
  // document.body.appendChild(container);
}

// --- Render Message Templates ---
async function renderMessageTemplates() {
  const templates = await DB.getTemplates();
  const container = document.createElement('div');
  container.className = 'p-4 space-y-2';

  const addButton = document.createElement('button');
  addButton.className = 'mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700';
  addButton.textContent = 'Add Message Template';
  addButton.onclick = () => {
    const modal = createTemplateModal();
    setupTemplateModalHandlers(modal);
    document.body.appendChild(modal);
  };
  container.appendChild(addButton);

  templates.forEach((template) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded shadow p-3 border';

    card.innerHTML = `
      <h2 class="font-bold text-green-600">${template.title}</h2>
      <div class="flex justify-between items-center mt-1">
        <p class="text-sm whitespace-pre-wrap flex-1 mr-2" id="template-body-${template.id}">${template.body}</p>
        <button class="text-sm text-white bg-gray-500 px-2 py-1 rounded hover:bg-gray-600" data-copy-id="${template.id}">
          Copy
        </button>
      </div>
    `;

    // Add copy-to-clipboard functionality
    const copyBtn = card.querySelector('button[data-copy-id]') as HTMLButtonElement;
    copyBtn.addEventListener('click', () => {
      const targetId = copyBtn.getAttribute('data-copy-id');
      const text = document.getElementById(`template-body-${targetId}`)?.textContent || '';
      navigator.clipboard.writeText(text);
      // dissapearing alert
      const alert = document.createElement('div');
      alert.className = 'bg-green-600 text-white px-4 py-2 rounded';
      alert.textContent = 'Template copied to clipboard!';
      card.appendChild(alert);
      setTimeout(() => {
        alert.remove();
      }, 2000);
    });

    container.appendChild(card);
  });

  const element = document.getElementById('message-template-data');
  if (element) {
    element.innerHTML = '';
    element.appendChild(container);
  }
}



// Handlers for button containers to remove them and render respective content
function handleViewContacts() {
  const btnContainer = document.getElementById('contact-button-container');
  if (btnContainer) btnContainer.remove();
  renderContacts();
}

function handleViewTemplates() {
  const btnContainer = document.getElementById('template-button-container');
  if (btnContainer) btnContainer.remove();
  renderMessageTemplates();
}

document.addEventListener('DOMContentLoaded', () => {
  const viewContactsBtn = document.getElementById('contact-button-container');
  const viewTemplatesBtn = document.getElementById('template-button-container');

  viewContactsBtn?.addEventListener('click', handleViewContacts);
  viewTemplatesBtn?.addEventListener('click', handleViewTemplates);
});

document.getElementById('open_dashboard')?.addEventListener('click', () => {
  chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });

});

document.getElementById('run-contact-script')?.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'RUN_LINKEDIN_PARSER' });
});


document.addEventListener('DOMContentLoaded', () => {
  if (chrome?.storage?.local) {
    chrome.storage.local.get(['awaitingReply', 'requireResponse'], (result) => {
      let aReply = 0;
      let rReply = 0;
      for (const [key, value] of Object.entries(result.awaitingReply ?? {})) {
        aReply += Number(value)
      }

      for (const [key, value] of Object.entries(result.requireResponse ?? {})) {
        rReply += Number(value)
      }

      // @ts-ignore
      document.getElementById('awaitingReply').textContent =
        'Awaiting Reply: ' + (aReply ?? 'N/A');

      // @ts-ignore
      document.getElementById('requireResponse').textContent =
        'Require Response: ' + (rReply ?? 'N/A');
    });
  } else {
    console.warn('chrome.storage.local not available');
  }
});

