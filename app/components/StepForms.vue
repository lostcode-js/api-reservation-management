<template>
  <div class="form-steps form-text-lg" role="tablist">
    <ul class="flex justify-between overflow-x-auto">
      <template v-for="(item, index) in options" :key="index">
        <li
          :class="{
            'form-step': true,
            'form-step-completed': currentStep > index,
            'form-step-active': currentStep === index,
            'form-step-disabled': currentStep < index,
          }"
        >
          <a
            href="#"
            @click.prevent="setCurrentStep(index)"
            :tabindex="currentStep === index ? 0 : -1"
            role="tab"
            :aria-selected="currentStep === index"
            :disabled="currentStep < index"
            :class="{
              'cursor-default': currentStep < index
            }"
          >
            <span class="text-xs sm:text-sm">{{ item }}</span>
          </a>
        </li>
      </template>
    </ul>
  </div>

  <template v-for="(item, index) in options">
    <slot v-if="currentStep === index" :name="`step_${index + 1}`"></slot>
  </template>

  <slot name="footer" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const setCurrentStep = (step: any) => {
  if(currentStep.value < step) {
    return
  }
  currentStep.value = step;
};

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Number,
    default: 0,
  },
});

const currentStep = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style scoped>
.form-steps {
  width: 100%;
  position: relative;
}

.form-text-lg {
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: 0;
}

.form-steps:before {
  content: " ";
  display: inline-block;
  background: #cbd5e1;
  position: absolute;
  top: 0.375rem;
  left: 0.125rem;
  right: 0.125rem;
  height: 0.25rem;
}

.form-step {
  display: block;
  position: relative;
  white-space: nowrap;
  flex: 1 1;
  text-align: center;
  padding: 1.25rem 0.625rem 0;
}

.form-step.form-step-disabled a {
  color: #334155;
}

.form-step a {
  text-decoration: none !important;
}

.form-step.form-step-disabled a:before {
  background: #cbd5e1;
}

.form-step a:before {
  content: " ";
  display: inline-block;
  width: 1rem;
  height: 1rem;
  position: absolute;
  background: #17c495;
  border-radius: 50%;
  left: 50%;
  transform: translate(-50%);
  top: 0;
}

.form-step a:after {
  content: " ";
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
  left: calc(50% - 0.25rem);
  transform: scale(0);
  top: 0.25rem;
  transition: transform 0.3s ease-in-out;
}

.form-step.form-step-active a:after {
  -webkit-mask-image: none;
  mask-image: none;
  background: #ffffff;
  top: 0.25rem;
  transform: scale(1);
  border-radius: 50%;
}

.form-step:first-of-type {
  padding-left: 0;
  text-align: left;
}

.form-step:first-of-type a:before {
  left: 0;
  transform: none;
}

.form-step:first-of-type a:after {
  left: 0.25rem;
}

.form-step:last-of-type a:before {
  right: 0;
  left: initial;
  transform: none;
}

.form-step:last-of-type a:after {
  left: initial;
  right: 0.25rem;
}

.form-step:last-of-type {
  padding-right: 0;
  text-align: right;
}

.form-step.form-step-completed:before {
  content: " ";
  display: inline-block;
  background: #17c495;
  position: absolute;
  top: 0.375rem;
  left: 0;
  right: 0;
  height: 0.25rem;
}

.form-step.form-step-completed a:after {
  -webkit-mask-image: url("../public/assets/check.svg");
  mask-image: url("../public/assets/check.svg");
  background: #fff;
  -webkit-mask-position: 0 0;
  mask-position: 0 0;
  -webkit-mask-size: 0.5rem 0.5rem;
  mask-size: 0.5rem 0.5rem;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  border-radius: 0;
  transform: scale(1);
}

.form-step.form-step-completed + .form-step:not(.form-step-completed):before {
  content: " ";
  display: inline-block;
  background: #17c495;
  position: absolute;
  top: 0.375rem;
  left: 0;
  right: 50%;
  height: 0.25rem;
}

.form-step.form-step-completed + .form-step:not(.form-step-completed):before {
  content: " ";
  display: inline-block;
  background: #17c495;
  position: absolute;
  top: 0.375rem;
  left: 0;
  right: 50%;
  height: 0.25rem;
}

.form-step.form-step-completed + .form-step:last-of-type:before {
  right: 0;
}
</style>
