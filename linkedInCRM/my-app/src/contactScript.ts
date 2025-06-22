console.log('[LinkedIn CRM] contentScript activated');

setInterval(() => {
    const el = Array.from(document.querySelectorAll("*"))
        .find(el => el.textContent?.trim().toLowerCase() === "message");

    const btn = document.querySelector('#save-contact');

    if (btn) {
        return;
    }

    if (el && el.parentElement) {
        const btn = document.createElement("button");
        btn.id = 'save-contact';
        btn.innerText = "Save Contact";
        btn.style.marginLeft = "10px";
        btn.style.padding = "4px 8px";
        btn.style.background = "#0073b1";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.borderRadius = "4px";
        btn.style.cursor = "pointer";
        btn.onclick = () => parseLinkedInProfile();

        el.parentElement.appendChild(btn);
    }
}, 3000)





type Contact = {
    id: string; // LinkedIn profile ID or custom UUID
    name: string;
    role: string; // e.g., 'Recruiter', 'Hiring Manager'
    company?: string;
    profileUrl: string;
    tags?: string[]; // e.g., ['referral', 'priority']
    notes?: string;
};


async function saveContacts(contacts: Contact[]): Promise<void> {
    return new Promise(resolve => {

        chrome.storage.local.get({ contacts: [] }, (result) => {
            const existingContacts: Contact[] = result.contacts || [];
            contacts = [...existingContacts, ...contacts];
            chrome.storage.local.set({ contacts }, () => resolve());
        });

    });
}




async function parseLinkedInProfile() {

    const ROLES = {
        RECRUITER: 'Recruiter',
        HR_MANAGER: 'Hiring Manager',
        OTHER: 'Other'
    }
    console.log('this runs');

    const recruiterCards = document.querySelectorAll('[class*="job-details-people-who-can-help__section-"]');

    const recruiters: Contact[] = [];

    recruiterCards.forEach(card => {
        const profileLink = card.querySelector('a[href*="linkedin.com/in/"]');
        const image = card.querySelector('img[alt]');
        const nameEl = card.querySelector('span[aria-hidden="true"]'); // name often here
        const aboutEl = card.querySelector('[class*="hirer-card__hirer-information"]')?.querySelector('[class*="text-body-small"');

        console.log(aboutEl?.textContent)


        //@ts-ignore
        const name = image?.alt || nameEl?.textContent.trim() || 'N/A';
        //@ts-ignore
        const linkedInProfile = profileLink?.href || 'N/A';
        //@ts-ignore
        const about = aboutEl?.textContent.trim() || 'N/A';

        const companyMatch = about.match(/at\s+(.+)/i);
        const company = companyMatch ? companyMatch[1] : 'N/A';

        recruiters.push({
            id: Math.floor(Math.random() * 100).toString(),
            role: ROLES.RECRUITER,
            name,
            profileUrl: linkedInProfile,
            notes: about,
            company
        });
    });

    console.log(recruiters);



    await saveContacts(recruiters)

};
