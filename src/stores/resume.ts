import {defineStore} from 'pinia';
import {router} from '@/router';
import {ref, shallowRef} from "vue";
import type {
    Certification,
    Education, Interest,
    Language,
    Project,
    Reference,
    Resume,
    Skill,
    Volunteering,
    Work
} from "@/types/resume";
import type {Candidate} from "@/types/candidate";

const dummy = {
    "age": "22",
    "city": "Paris",
    "name": "jhon doe",
    "alias": "Demo Alias",
    "work": [{
        "city": "Casablanca",
        "end_date": "06-2021",
        "job_title": 'Web developer',
        "start_date": "03-2021",
        "company_name": "GoSoft",
        "responsibilities": "Conception, Réalisation et Déploiement d'une Application webde gestion de stock en utilisant Angular et Laravel pour ledéveloppement et PuTTY pour la connexion au VPS etdéploiement de l'application."
    }, {
        "job_title": " been the industry's",
        "responsibilities": " essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently ",
        "company_name": "socio",
        "city": "Paris",
        "start_date": "march 23",
        "end_date": "may 19"
    }],
    "email": "jhon@doe@gmail.com",
    "phone": "5435436435",
    "skills": [{"skill": "Javascript", "level": 5}, {"level": 5, "skill": "Vue js 3"}, {
        "skill": "Python",
        "level": 1
    }, {"skill": "Nest js", "level": 5}],
    "social": [{"skill": "self driven", "level": "2"},
        {
            "skill": "Leaderhip and management",
            "level": "4"
        },
        {
            "skill": "Motivated and organized",
            "level": "4"
        }, {"skill": "going to use a passage of Lorem Ipsum", "level": "6"}],
    "projects": [{
        "end_date": "2024",
        "start_date": "2023",
        "description": "Application pour la réservation des Tickets du Busway pour trouverle plus court chemin et résoudre le problème d'encombrement, enutilisant Java et Neo4j.",
        "project_name": "Réservation des Tickets Busway"
    }, {
        "end_date": "2024",
        "start_date": "2023",
        "description": "Réalisation de la cartographie de degré de centralité en se basantsur le traffic avec C et Leaflet.",
        "project_name": "Cartographie de degré de Centralité dans Paris"
    }, {
        "end_date": "2023",
        "start_date": "2022",
        "description": "Gestion de la paie des employés d'une entreprise, soit toute seuleou ayant des entreprises filles, en utilisant HTML, CSS, JavaScriptet PHP.",
        "project_name": "Application Web pour la gestion de la paie dans les entreprises"
    }],
    "interests": [{"interest": "cooking"}, {"interest": "TV"}, {"interest": "Reading"}],
    "languages": [{"level": 4, "language": "Anglais"}, {
        "level": 5,
        "language": "Français"
    }, {"level": 8, "language": "Arabe"}],
    "educations": [{
        "degree": "Ingénierie Logicielle et Intégration des Systèmes Informatiques",
        "end_year": "2024",
        "start_year": "2022",
        "institution": "Faculté des Sciences et Techniques"
    }, {
        "degree": "Licence en Informatique, Réseaux et Multimédia",
        "end_year": "2022",
        "start_year": "2021",
        "institution": "Faculté des Sciences et Techniques"
    }, {
        "degree": "DEUST en Mathématiques, Informatique et Physique",
        "end_year": "2021",
        "start_year": "2019",
        "institution": "Faculté des Sciences et Techniques"
    }, {
        "degree": "Baccalauréat Scientifique",
        "end_year": "2019",
        "start_year": "2018",
        "institution": "Lycée Chahid Idriss Lahrizi"
    }],
    "references": [{
        "name": "Reference name",
        "phone": "546547576",
        "company": "company name ",
        "position": "reference position ",
        "email": "jhon@doe.com"
    }],
    "volunteering": [{
        "organization": "Vol Organisation",
        "position": "Vol position",
        "start_date": "march 23",
        "end_date": "march 23",
        "description": "centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release"
    }],
    "certifications": [{
        "certification": "certification name",
        "institution": "institution bane",
        "date": "march 23",
        "link": "link.com/jheje87ew"
    }],
    "summary": "as opposed to using 'Content here,content here',making it look like readitit look like readable English. Many desktop as opposed to using 'Content here, content here', making it look like readable English. Many desktop\ndsdsdsdas opposed to using 'Conten look like readable English. Many desktop as opposed to using 'Content here, content here', making it look like readable English. Many desktop\ndsdsdsdas opposed to using 'Contenable English. Many desktop as opposed to using 'Content here, content here', making it look like readable English. Many desktop\ndsdsdsdas opposed to using 'Content here, content here', making it look like readable English. Many desktop",
    "headline": "Fullstack software developer",
};

export const default_resume = {
    name: '',
    headline: '',
    imageUrl: '',
    email: '',
    yoe:'',
    phone: '',
    age: '',
    city: '',
    summary: '',
    work: [] as Work[],
    educations: [] as Education[],
    projects: [] as Project[],
    certifications: [] as Certification[],
    volunteering: [] as Volunteering[],
    references: [] as Reference[],
    languages: [] as Language[],
    skills: [] as Skill[],
    interests: [] as Interest[],
    social: [] as Skill[],
};

interface SyncData {
    id: string | undefined,
    blob: Blob,
}

export const useResumeStore = defineStore('pinjobs-resume-store', () => {
    const resume = ref<Resume>(<Resume>default_resume);
    const sync = ref<SyncData[]>([]);
    const candidateSelected = ref({} as Candidate);
    const isTranslated = ref<boolean>(false);
    function setResume(res: Resume, candidate?: Candidate) {
        resume.value = res;
        candidateSelected.value = candidate ?? {} as Candidate;
    }


    function PreLoad() {
        resume.value = dummy as unknown as Resume;
    }

    function addSync(sn: SyncData) {
        sync.value.push(sn);
    }

    function clearSync() {
        sync.value = [];
    }

    return {resume, sync, setResume,  PreLoad, candidateSelected,isTranslated}
})

