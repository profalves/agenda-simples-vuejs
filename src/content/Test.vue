<template>

  DRAG AND DROP
  <vue-transmit ref="uploader"
                upload-area-classes="vh-20"
                drag-class="dragging"
                v-bind="options"
                @added-file="onAddedFile"
                @success="onUploadSuccess"
                @success-multiple="onUploadSuccessMulti"
                @timeout="onError"
                @error="onError">
    
        <button variant="primary"
               @click="triggerBrowse"
               class="button">
          Upload Files
        </button>
    <template slot-scope="{ uploadingFiles }"
              slot="files">
      
        <img v-show="file.dataUrl"
             :src="file.dataUrl"
             :alt="file.name">
    </template>
  </vue-transmit>
</template>

<script>
import { VueTransmit } from 'vue-transmit'

export default {
  name: "App",
  components: {
    VueTransmit
  },
  data() {
    return {
      options: {
        acceptedFileTypes: ["image/*"],
        clickable: false,
        accept: this.accept,
        uploadMultiple: true,
        maxConcurrentUploads: 4,
        adapterOptions: {
          url: "/",
          timeout: 3000,
          errUploadError: xhr => xhr.response.message
        }
      },
      files: [],
      showModal: false,
      error: "",
      count: 0
    };
  },
  methods: {
    triggerBrowse() {
      this.$refs.uploader.triggerBrowseFiles();
    },
    onAddedFile(file) {
      console.log(
        this.$refs.uploader.inputEl.value,
        this.$refs.uploader.inputEl.files
      );
    },
    onUploadSuccess(file, res) {
      console.log(res);
      if (!this.options.uploadMultiple) {
        file.src = res.url[0];
        this.files.push(file);
      }
    },
    onUploadSuccessMulti(files, res) {
      console.log(...arguments);
      for (let i = 0; i < files.length; i++) {
        files[i].src = res.url[i];
        this.files.push(files[i]);
      }
    },
    onError(file, errorMsg) {
      this.error = errorMsg;
      this.showModal = true;
    },
    listen(event) {
      this.$refs.uploader.$on(event, (...args) => {
        console.log(event);
        for (let arg of args) {
          // console.log(`${typeof arg}: ${JSON.stringify(arg, undefined, 2)}`)
          console.log(arg);
        }
      });
    },
    accept(file, done) {
      this.count++;
      console.log(JSON.stringify(file, undefined, 2));
      done();
    }
  },
  filters: {
    json(value) {
      return JSON.stringify(value, null, 2);
    }
  },
  mounted() {
    [
      "drop",
      "drag-start",
      "drag-end",
      "drag-enter",
      "drag-over",
      "drag-leave",
      "accepted-file",
      "rejected-file",
      "accept-complete",
      "added-file",
      "added-files",
      "removed-file",
      "thumbnail",
      "error",
      "error-multiple",
      "processing",
      "processing-multiple",
      "upload-progress",
      "total-upload-progress",
      "sending",
      "sending-multiple",
      "success",
      "success-multiple",
      "canceled",
      "canceled-multiple",
      "complete",
      "complete-multiple",
      "reset",
      "max-files-exceeded",
      "max-files-reached",
      "queue-complete"
    ].forEach(this.listen);
  }
};
</script>

