
export const ROLES = {
    RECRUITER: 'Recruiter',
    HR_MANAGER: 'Hiring Manager',
    OTHER: 'Other'
}

export type Contact = {
    id: string; // LinkedIn profile ID or custom UUID
    name: string;
    role: string; // e.g., 'Recruiter', 'Hiring Manager'
    company?: string;
    profileUrl: string;
    tags?: string[]; // e.g., ['referral', 'priority']
    notes?: string;
};

export type Message = {
    id: string; // unique msg ID or generated hash
    threadId: string;
    contactId: string;
    direction: 'sent' | 'received';
    timestamp: number;
    content: string;
};

export type ThreadStatus = {
    threadId: string;
    contactId: string;
    lastUpdated: number;
    status: 'awaiting_reply' | 'replied' | 'follow_up_later' | 'archived';
};

export type MessageTemplate = {
    id: string;
    title: string; // e.g., "Cold Recruiter Reachout"
    body: string; // can include {{name}}, {{role}} placeholders
    createdAt: string;
};

// DB helper object for CRUD-like functions
export const DB = {
    async getContacts(): Promise<Contact[]> {
        return new Promise(resolve => {
            chrome.storage.local.get(['contacts'], result => {
                resolve(result.contacts || []);
            });
        });
    },

    async saveContacts(contacts: Contact[]): Promise<void> {
        return new Promise(resolve => {
            chrome.storage.local.set({ contacts }, () => resolve());
        });
    },

    async addContact(contact: Contact): Promise<void> {
        const contacts = await this.getContacts();
        contacts.push(contact);
        await this.saveContacts(contacts);
    },

    async getMessages(): Promise<Message[]> {
        return new Promise(resolve => {
            chrome.storage.local.get(['messages'], result => {
                resolve(result.messages || []);
            });
        });
    },

    async saveMessages(messages: Message[]): Promise<void> {
        return new Promise(resolve => {
            chrome.storage.local.set({ messages }, () => resolve());
        });
    },

    async addMessage(message: Message): Promise<void> {
        const messages = await this.getMessages();
        messages.push(message);
        await this.saveMessages(messages);
    },

    async getThreadStatuses(): Promise<ThreadStatus[]> {
        return new Promise(resolve => {
            chrome.storage.local.get(['threadStatus'], result => {
                resolve(result.threadStatus || []);
            });
        });
    },

    async saveThreadStatuses(statuses: ThreadStatus[]): Promise<void> {
        return new Promise(resolve => {
            chrome.storage.local.set({ threadStatus: statuses }, () => resolve());
        });
    },

    async updateThreadStatus(updatedStatus: ThreadStatus): Promise<void> {
        const statuses = await this.getThreadStatuses();
        const idx = statuses.findIndex(s => s.threadId === updatedStatus.threadId);
        if (idx >= 0) {
            statuses[idx] = updatedStatus;
        } else {
            statuses.push(updatedStatus);
        }
        await this.saveThreadStatuses(statuses);
    },

    async getTemplates(): Promise<MessageTemplate[]> {
        return new Promise(resolve => {
            chrome.storage.local.get(['templates'], result => {
                resolve(result.templates || []);
            });
        });
    },

    async saveTemplates(templates: MessageTemplate[]): Promise<void> {
        return new Promise(resolve => {
            chrome.storage.local.set({ templates }, () => resolve());
        });
    },

    async addTemplate(template: MessageTemplate): Promise<void> {
        const templates = await this.getTemplates();
        templates.push(template);
        await this.saveTemplates(templates);
    }
};
