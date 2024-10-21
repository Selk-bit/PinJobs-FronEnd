<script setup>
import {ref} from 'vue';
import EditorMenu from './EditorMenu.vue';

const props = defineProps({editor: Object});

// <button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
//       bold
//     </button>
//     <button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
//       italic
//     </button>
//     <button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
//       strike
//     </button>
//     <button @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
//       code
//     </button>
//     <button @click="editor.chain().focus().unsetAllMarks().run()">
//       clear marks
//     </button>
//     <button @click="editor.chain().focus().clearNodes().run()">
//       clear nodes
//     </button>
//     <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
//       paragraph
//     </button>
//     <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
//       h1
//     </button>
//     <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
//       h2
//     </button>
//     <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
//       h3
//     </button>
//     <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
//       h4
//     </button>
//     <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
//       h5
//     </button>
//     <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
//       h6
//     </button>
//     <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
//       bullet list
//     </button>
//     <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
//       ordered list
//     </button>
//     <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
//       code block
//     </button>
//     <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
//       blockquote
//     </button>
//     <button @click="editor.chain().focus().setHorizontalRule().run()">
//       horizontal rule
//     </button>
//     <button @click="editor.chain().focus().setHardBreak().run()">
//       hard break
//     </button>
//
// <v-btn @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
//       h1
//     </v-btn>
//     <v-btn @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
//       h2
//     </v-btn>
//     <v-btn @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
//       h3
//     </v-btn>
//     <v-btn @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
//       h4
//     </v-btn>
//     <v-btn @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
//       h5
//     </v-btn>
//     <v-btn @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
//       h6
//     </v-btn>
const items = ref([
  {
    icon: 'bold',
    title: 'Bold',
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive('bold')
  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive('italic')
  },
  // {
  //   icon: 'strikethrough',
  //   title: 'Strike',
  //   action: () => props.editor.chain().focus().toggleStrike().run(),
  //   isActive: () => props.editor.isActive('strike')
  // },
  // {
  //     icon: 'code-view',
  //     title: 'Code',
  //     action: () => props.editor.chain().focus().toggleCode().run(),
  //     isActive: () => props.editor.isActive('code')
  // },
  {
    icon: 'mark-pen-line',
    title: 'Highlight',
    action: () => props.editor.chain().focus().toggleHighlight({color: 'yellow'}).run(),
    isActive: () => props.editor.isActive('highlight')
  },
  {
    type: 'divider'
  },
  {
    icon: 'h-1',
    title: 'Heading 1',
    action: () => props.editor.chain().focus().toggleHeading({level: 1}).run(),
    isActive: () => props.editor.isActive('heading', {level: 1})
  },
  {
    icon: 'h-2',
    title: 'Heading 2',
    action: () => props.editor.chain().focus().toggleHeading({level: 2}).run(),
    isActive: () => props.editor.isActive('heading', {level: 2})
  },
  {
    icon: 'h-3',
    title: 'Heading 3',
    action: () => props.editor.chain().focus().toggleHeading({level: 3}).run(),
    isActive: () => props.editor.isActive('heading', {level: 3})
  },
  {
    icon: 'h-4',
    title: 'Heading 4',
    action: () => props.editor.chain().focus().toggleHeading({level: 4}).run(),
    isActive: () => props.editor.isActive('heading', {level: 4})
  },
  {
    icon: 'h-5',
    title: 'Heading 5',
    action: () => props.editor.chain().focus().toggleHeading({level: 5}).run(),
    isActive: () => props.editor.isActive('heading', {level: 5})
  },
  {
    icon: 'h-6',
    title: 'Heading 6',
    action: () => props.editor.chain().focus().toggleHeading({level: 6}).run(),
    isActive: () => props.editor.isActive('heading', {level: 6})
  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive('paragraph')
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList')
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList')
  },
  // {
  //   icon: 'list-check-2',
  //   title: 'Task List',
  //   action: () => props.editor.chain().focus().toggleTaskList().run(),
  //   isActive: () => props.editor.isActive('taskList')
  // },
  // {
  //   icon: 'code-box-line',
  //   title: 'Code Block',
  //   action: () => props.editor.chain().focus().toggleCodeBlock().run(),
  //   isActive: () => props.editor.isActive('codeBlock')
  // },
  {
    type: 'divider'
  },
  // {
  //   icon: 'double-quotes-l',
  //   title: 'Blockquote',
  //   action: () => props.editor.chain().focus().toggleBlockquote().run(),
  //   isActive: () => props.editor.isActive('blockquote')
  // },
  // {
  //   icon: 'separator',
  //   title: 'Horizontal Rule',
  //   action: () => props.editor.chain().focus().setHorizontalRule().run()
  // },
  // {
  //   type: 'divider'
  // },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    action: () => props.editor.chain().focus().setHardBreak().run()
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => props.editor.chain().focus().clearNodes().unsetAllMarks().run()
  },
  {
    type: 'divider'
  },
  {
    icon: 'arrow-go-back-line',
    title: 'Undo',
    action: () => props.editor.chain().focus().undo().run()
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
    action: () => props.editor.chain().focus().redo().run()
  }
]);
</script>
<template>
  <div class="d-flex align-center flex-wrap cursor-pointer menuBar ">
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`"/>

      <EditorMenu v-else :key="index" v-bind="item"/>
    </template>
  </div>
</template>
<style lang="scss">
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: #00cec3;
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}

.menuBar {
  border: 1px solid rgb(var(--v-theme-inputBorder), 0.3);
  padding: 8px;
  overflow: auto;
  border-radius: 12px 12px 0 0;
}
</style>
