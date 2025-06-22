function embedShowTemplateButton() {
    const sendButton = document.querySelector('.msg-form__send-button');
    const parent = sendButton?.parentElement;

    if (!parent || document.getElementById('show-template-button')) return;

    const button = document.createElement('button');
    button.id = 'show-template-button';
    button.innerText = '📋 Show Templates';
    button.onclick = async () => {
        const templates = await new Promise(resolve => {
            chrome.storage.local.get(['templates'], result => {
                resolve(result.templates || []);
            });
        });
        showTemplateModal(templates as Array<{ id: string; title: string; body: string; createdAt: string }>);
    };
    button.style.margin = '10px';
    button.style.padding = '6px 12px';
    button.style.background = '#e6a100';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';

    parent.appendChild(button);
}


async function getChatHistory() {

    const messgEle = Array.from(document.querySelectorAll('.msg-s-event-listitem__body')) as HTMLElement[];
    const profileName = Array.from(document.querySelectorAll('.msg-s-message-group__profile-link')).slice(1) as HTMLElement[];

    // @ts-ignore
    let senderName = document.querySelectorAll('.profile-card-one-to-one__profile-link')[0]?.innerText as string;

    senderName = senderName.trim();

    let userName = ''

    for (let item of profileName) {
        console.log(item);
        if (item.innerText !== senderName) {

            userName = item.innerText
            break;
        }
    }

    // combine mssg ele with profileName
    const combined = messgEle.map((v, i) => {
        return {
            profileName: profileName[i].innerText,
            message: v.innerText
        }
    });

    const getChatHistory = await new Promise(resolve => {
        chrome.storage.local.get(['chatHistory'], result => {
            resolve(result.chatHistory || {});
        })
    });

    // @ts-ignore
    getChatHistory[senderName + '_' + userName] = combined;

    await new Promise(resolve => {
        chrome.storage.local.set({ chatHistory: getChatHistory }, () => {
            console.log(resolve('chat saved'));
        });
    });

    const awaitingReply = await new Promise(resolve => {
        chrome.storage.local.get(['awaitingReply'], result => {
            resolve(result.awaitingReply || {})
        })
    })

    const requireResponse = await new Promise(resolve => {
        chrome.storage.local.get(['requireResponse'], result => {
            resolve(result.requireResponse || {})
        })
    })

    if (combined[combined.length - 1].profileName === senderName) {
        await new Promise(resolve => {
            // @ts-ignore
            requireResponse[senderName] = 1;
            chrome.storage.local.set({ requireResponse }, () => {
                resolve(null);
            })
        })
    } else {
        await new Promise(resolve => {
            // @ts-ignore
            awaitingReply[senderName] = 1;

            chrome.storage.local.set({ awaitingReply }, () => {
                resolve(null);
            })
        })

    }

    alert('chat history saved');



}

function embedSaveChatButton() {
    const sendButton = document.querySelector('.msg-form__send-button');
    const parent = sendButton?.parentElement;

    if (!parent || document.getElementById('save-chat-button')) return;

    const button = document.createElement('button');
    button.id = 'save-chat-button';
    button.innerText = '💾 Save Chat';
    button.onclick = () => getChatHistory();
    button.style.margin = '10px';
    button.style.padding = '6px 12px';
    button.style.background = '#0073b1';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';

    parent.appendChild(button);
}




// Show template modal function, rendering templates as array
function showTemplateModal(templates: Array<{ id: string; title: string; body: string; createdAt: string }>) {
    // Create modal element
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = '#fff';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    modal.style.zIndex = '9999';
    modal.style.maxHeight = '80vh';
    modal.style.overflowY = 'auto';

    // Render each template
    for (const template of templates as Array<{ id: string; title: string; body: string; createdAt: string }>) {
        const div = document.createElement('div');
        div.style.marginBottom = '10px';
        div.style.padding = '10px';
        div.style.background = '#f1f1f1';
        div.style.borderRadius = '4px';
        div.style.background = '#000';
        div.innerHTML = `
            <strong>${template.title}</strong><br>
            <small>${new Date(template.createdAt).toLocaleString()}</small><br>
            <p>${template.body}</p>
        `;
        modal.appendChild(div);
    }

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'Close';
    closeBtn.style.marginTop = '10px';
    closeBtn.style.color = '#fff'
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);
}


// Run every 3 seconds
setInterval(() => {
    embedSaveChatButton();
    embedShowTemplateButton();
}, 3000);