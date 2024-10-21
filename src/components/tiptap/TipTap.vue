<template>
  <div v-if="editor">
    <EditorMenubar :editor="editor"/>
  </div>
  <editor-content :editor="editor"  class="tiptap"/>
</template>

<style scoped lang="scss">
.tiptap {
  border-width: 1px;
  border-style: solid;
  border-color: v-bind(getPrimary);
  > * + * {
    margin-top: 2em;
    background-color: red;
  }

  ul,
  ol {
    padding: 0 10rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

</style>

<script>
import StarterKit from '@tiptap/starter-kit'
import {Editor, EditorContent} from '@tiptap/vue-3'
import EditorMenubar from "@/components/tiptap/plugins/editor/EditorMenubar.vue";
import {Highlight} from "@tiptap/extension-highlight";
import {Blockquote} from "@tiptap/extension-blockquote";
import {getPrimary} from "@/utils/UpdateColors";

export default {
  components: {
    EditorMenubar,
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({

      extensions: [
        StarterKit,
        Highlight.configure({multicolor: true}),
      ],
      content: this.modelValue,
      editorProps: {
        attributes: {
          class: 'text-sm lg:text-lg xl:text-2xl mx-auto',
        },
      },
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>