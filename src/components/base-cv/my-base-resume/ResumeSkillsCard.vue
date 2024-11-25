<script setup lang="ts">
import type { Skill } from '@/types/resume';
import { getPrimary } from '@/utils/UpdateColors';
import { computed } from 'vue';

const props = defineProps<{
    skills?: Skill[];
    title?: string;
}>();
const { skills } = props;
const groupedSkills = computed(() => {
    const skillMap = skills?.reduce((acc: { [key: string]: { skill: string; level: string }[] }, item: Skill) => {
        const category = item?.category as string;

        // Initialize the category if it doesn't exist
        if (!acc[category]) {
            acc[category] = [];
        }

        // Add the skill and its level to the category
        acc[category] = [...acc[category], { skill: item.skill, level: item.level }];
        return acc;
    }, {});

    // Convert the object into an array of { category, skills }
    return Object.entries(skillMap || {}).map(([category, skills]) => ({
        category,
        skills
    }));
});


</script>
<template>
    <v-row v-if="skills">
        <v-col cols="12">
            <v-card variant="outlined" class="bg-surface">
                <v-card-item>
                    <div class="d-flex justify-space-between align-center mb-4">
                        <h3 class="text-h6 font-weight-bold">All Skills</h3>
                        <v-btn variant="tonal" prepend-icon="mdi-pencil" color="primary">
                            Edit
                        </v-btn>
                    </div>
                      <v-divider />
                    <div class="text-body-2 text-info m-2">
                        <v-icon>mdi-information-outline</v-icon>
                         Hover on the skill to see the level
                    </div>
                    <v-row v-for="item in groupedSkills" no-gutters>
                        <v-col cols="12" class="my-2">
                            <div class="text-h4"> {{ item.category }}</div>
                        </v-col>
                        <v-col cols="12">
                            <ul>
                                <li v-for="skill in item.skills " :key="skill.skill" class="d-inline-flex      lh-md">
                                    <v-tooltip :text="skill.level != '' ? skill.level : $t('level-empty')">
                                        <template v-slot:activator="{ props }">
                                            <div class="pa-0 ma-0">
                                                <v-chip color="primary" v-bind="props"
                                                        class="text-wrap text-subtitle-2 my-1 ma-1 ">
                                                    {{ skill?.skill }}
                                                </v-chip>

                                            </div>
                                        </template>
                                    </v-tooltip>

                                </li>
                            </ul>
                        </v-col>
                    </v-row>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row >
        <v-row v-else>
            <v-col class="justify-center d-flex ma-2">
              No skills found
            </v-col>
        </v-row>
</template>


<style scoped lang="scss">


.skill-bar {
    //display: flex;
    gap: 5px; /* Space between dashes */
    display: inline-flex;
}

.skill-level {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: #a19d9d; /* Default color for empty dash */
}

.dash-filled {
    background-color: #72d072;
}

</style>