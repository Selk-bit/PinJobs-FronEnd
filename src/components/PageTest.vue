<template>
  <v-container class="my-documents-container" fluid>
    <v-row>
      <!-- Sidebar Section -->
      <v-col cols="12" md="3" class="sidebar">
        <h3 class="sidebar-title">My Documents</h3>
        <v-tabs v-model="tab" fixed-tabs color="primary" class="mb-4">
          <v-tab>Resumes</v-tab>
          <v-tab>Cover Letters</v-tab>
          <v-tab>Resignation Letters</v-tab>
          <v-tab>Websites</v-tab>
        </v-tabs>
        <v-card outlined class="new-document-card">
          <v-list dense>
            <v-list-item class="document-option">
              <v-icon color="primary" start>mdi-plus</v-icon>
              <span>New Resume</span>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="document-option">
              <v-icon color="primary" start>mdi-robot</v-icon>
              <span>New Resume with AI</span>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="document-option">
              <v-icon color="primary" start>mdi-linkedin</v-icon>
              <span>Import from LinkedIn</span>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="document-option">
              <v-icon color="primary" start>mdi-file</v-icon>
              <span>Use Example</span>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Main Content Section -->
      <v-col cols="12" md="9">
        <v-row>
          <!-- Resume Card -->
          <v-col cols="12" sm="6" md="4">
            <v-card outlined class="resume-card">
              <v-card-title class="text-center">Oussama Reghay</v-card-title>
              <v-card-text class="text-center">
                <p>Email: example@example.com</p>
                <p>Education, Skills...</p>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Premium Card -->
          <v-col cols="12" sm="6" md="4">
            <v-card outlined class="premium-card">
              <v-card-title class="text-center">Land a better job with PREMIUM</v-card-title>
              <v-card-subtitle class="text-center">
                Unlock all templates and AI tools, starting at <strong>USD 4/month</strong>
              </v-card-subtitle>
              <v-card-actions class="d-flex justify-center">
                <v-btn color="secondary" class="mt-3" block>Go Premium!</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Another Resume Card -->
          <v-col cols="12" sm="6" md="4">
            <v-card outlined class="resume-card">
              <v-card-title class="text-center">Oussama Reghay Resume</v-card-title>
              <v-card-text>
                <p>Full resume details...</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Create New Button -->
        <v-btn color="error" class="create-new-btn mt-5" large>
          Create New
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const tab = ref(0);
</script>

<style scoped>
/* General Styles */
.my-documents-container {
  padding: 20px;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.sidebar {
  border-right: 1px solid #ddd;
  padding: 20px;
}

.new-document-card {
  padding: 10px;
  margin-top: 20px;
}

.document-option {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.document-option:hover {
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 5px;
}

/* Resume Card */
.resume-card {
  transition: transform 0.2s ease;
}

.resume-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
}

.resume-card .v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Premium Card */
.premium-card {
  background-color: #673ab7;
  color: white;
  transition: transform 0.2s ease;
}

.premium-card:hover {
  transform: scale(1.05);
}

.premium-card .v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.premium-card .v-card-subtitle {
  font-size: 0.9rem;
  margin: 10px 0;
}

/* Create New Button */
.create-new-btn {
  float: right;
  font-size: 1.2rem;
}
</style>
