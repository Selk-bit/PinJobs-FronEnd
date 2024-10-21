import type {Identity, Template} from "@/types/model";

export const DEFAULT_MODEL: Template = {
    "name": '',
    "reference": '',
    language: '',
    "templateData": {
        "identity": "reference" as Identity,
        "template": "sydney",
        "company_logo": {
            "url": "https://i0.wp.com/statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg?ssl=1",
            "border": false,
            "hidden": false,
            "grayscale": false,
            "size": 70,
            "aspectRatio": 1,
            "borderRadius": 23,
        },
        "page": {
            "margin": 12,
            "format": 'a4',
            "headline": true,
            "summary": true,
            "breakLine": false,
            "pageNumbers": false,
        },
        "certifications": {"name": 'certifications', "visible": true},
        "education": {"name": 'education', "visible": true},
        "experience": {"name": 'experience', "visible": true},
        "volunteering": {"name": 'volunteering', "visible": true},
        "interests": {"name": 'interests', "visible": true},
        "languages": {"name": 'languages', "visible": true},
        "projects": {"name": 'projects', "visible": true},
        "references": {"name": 'references', "visible": true},
        "skills": {"name": 'skills', "visible": true},
        "social": {"name": 'socials', "visible": true},
        "theme": {
            'background': "#fff",
            "text": "#332D2D",
            "primary": "#1E1E1F",
        },
        "personnel": {
            "name": true,
            "phone": true,
            "city": true,
            "age": true,
            "email": true,
        },
        "typography": {
            "family": "open-sans",
            "size": 16,
            "lineHeight": 2,
            "hideIcons": false,
            "underlineLinks": false,
        },
    }
};