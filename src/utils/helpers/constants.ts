import type { Language } from '@/types/language';
import type { Identity } from '@/types/model';

export const default_model_data = {
    'name': '',
    'reference': null,
    'language': 'en' as Language,
    'templateData': {
        'identity': 'reference' as Identity,
        'template': 'sydney',
        'company_logo': {
            'url': '',
            'border': false,
            'hidden': false,
            'grayscale': false,
            'size': 70,
            'aspectRatio': 1,
            'borderRadius': 50
        },
        'page': {
            'margin': 12,
            'format': 'a4',
            'headline': true,
            'summary': true,
            'breakLine': false,
            'pageNumbers': false
        },
        'certifications': { 'name': '', 'visible': true },
        'education': { 'name': '', 'visible': true },
        'experience': { 'name': '', 'visible': true },
        'volunteering': { 'name': '', 'visible': true },
        'interests': { 'name': '', 'visible': true },
        'languages': { 'name': '', 'visible': true },
        'projects': { 'name': '', 'visible': true },
        'references': { 'name': '', 'visible': true },
        'skills': { 'name': '', 'visible': true },
        'social': { 'name': '', 'visible': true },
        'theme': {
            'background': '#fff',
            'text': '#972F2F',
            'primary': '#E0D3D3'
        },
        'personnel': {
            'name': true,
            'phone': true,
            'city': true,
            'age': true,
            'email': true
        },

        'typography': {
            'family': 'open-sans',
            'size': 16,
            'lineHeight': 2,
            'hideIcons': false,
            'underlineLinks': false
        }
    }
};
