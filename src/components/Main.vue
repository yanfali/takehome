<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import InputText from "./InputText.vue";
import RadioButtons from "./RadioButtons.vue";
import LButton from "./LButton.vue";
import EmailList from "./EmailList.vue";
import MsgComponent from "./MessageComponent.vue";
import validator from "validator";
import { testAlert, saveAlert } from "../api";
import axios, { AxiosError, AxiosResponse } from "axios";

const components = { InputText, RadioButtons, LButton, EmailList };
interface RadioOptions {
  label: string;
  value: string | number;
}
const options: RadioOptions[] = [
  { label: "Hourly", value: "hourly" },
  { label: "Daily", value: "daily" },
];

const UIMessages: Ref<Record<string, string | undefined>> = ref({
  alert: undefined,
  frequency: undefined,
  emailRecipients: undefined,
  system: undefined,
});

const messageColors: Ref<Record<string, string | undefined>> = ref({
  alert: undefined,
  frequency: undefined,
  emailRecipients: undefined,
  system: undefined,
});

// Obviously not the best way to do this, but good enough for demo
// Something like Vuelidate is a more robust way to do this.
const formIsIncompleteOrHasErrors = computed(() => {
  if (message.value.length < 1) {
    return true;
  }

  if (emails.value.length < 1) {
    return true;
  }

  const validationErrors =
    Object.keys(UIMessages.value)
      .filter((key) => key !== "system" && key !== "email")
      .filter((key) => UIMessages.value[key] !== undefined).length > 0;
  if (validationErrors) {
    return true;
  }
  return false; // Enable Save
});

function hasError(key: string) {
  return UIMessages.value[key] !== undefined;
}

// Form Values
const message = ref("");
const frequency = ref("hourly");
const emailRecipient = ref("");
const emails: Ref<string[]> = ref([]);

function deleteEmailHandler(email: string) {
  emails.value = emails.value.filter((entry: string) => entry !== email);
}

// Very simple email validation
// checks for duplicates and validity of email via validator.js
function addEmailHandler() {
  clearUIMessage("emailRecipient");
  if (emails.value.length === 10) {
    setMessage(
      "system",
      "Sorry no more than 10 Emails",
      5000,
      "text-amber-400"
    );
    return;
  }
  if (!validator.isEmail(emailRecipient.value)) {
    setMessage("emailRecipient", "Sorry That Does Not Look like a Valid Email");
    return;
  }
  if (!emails.value.includes(emailRecipient.value.toLowerCase())) {
    emails.value.push(emailRecipient.value.toLowerCase());
  } else {
    setMessage("system", "Sorry Duplicate Email", 3000, "text-amber-400");
    return;
  }
  emailRecipient.value = "";
}

/**
 * Display Messages based on a key near appropriate field
 * @param key - field name
 * @param msg - message you want to display
 * @param clear - time in MS to clear message automatically. 0 means never clear.
 * @param color - optional color. Defaults to error color
 */
function setMessage(
  key: "system" | "emailRecipient" | "frequency" | "alert",
  msg: string,
  clear: number = 0,
  color: string = "text-red-500"
) {
  UIMessages.value[key] = msg;
  messageColors.value[key] = color;
  if (clear > 0) {
    setTimeout(() => {
      clearUIMessage(key);
    }, clear);
  }
}

function clearUIMessage(
  key: "system" | "emailRecipient" | "frequency" | "alert" | "all"
) {
  if (key === "all") {
    ["system", "emailRecipient", "frequency", "alert"].forEach(
      (key) => (UIMessages.value[key] = undefined)
    );
  }
  UIMessages.value[key] = undefined;
}

function requestAPITest() {
  clearUIMessage("system");
  testAlert()
    .then(() => {
      setMessage("system", "Test Request Successful", 3000, "text-green-600");
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError;
        if (serverError && serverError.response) {
          const { response } = serverError;
          if (response.status === 418) {
            UIMessages.value["system"] = response.data;
          }
        }
      }
    });
}

function resetForm() {
  message.value = "";
  emails.value = [];
  frequency.value = "hourly";
}

function saveAlertHandler($event?: Event | undefined): void {
  clearUIMessage("system");
  saveAlert(message.value, frequency.value, emails.value)
    .then((resp: AxiosResponse) => {
      if (resp.status === 200) {
        setMessage("system", "Alert saved", 3000, "text-green-600");
        resetForm();
      }
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError;
        if (serverError && serverError.response) {
          const { response } = serverError;
          if (response.status === 418) {
            setMessage("system", response.data);
          }
        }
      }
    });
}
</script>
<template>
  <header
    class="bg-gray-200 p-1 font-extrabold border-2 border-b-gray-500 flex justify-between"
  >
    <div class="pl-1em self-start"><a href="https://somecomapny.com">Some Company</a></div>
    <div class="pr-1em self-end text-pink-900">
      <a href="http://localhost:5000/documentation">API</a>
    </div>
  </header>
  <main class="grid grid-col-1 row-col-1 h-90vh">
    <div
      class="bg-gray-50 border-3 min-h-min min-w-700px border-gray-800 m-auto mt-5em"
    >
      <div class="pt-10 pr-10 pl-10">
        <h1 class="text-left font-bold text-xl">Email Alert</h1>
        <form
          class="flex flex-col pr-30px pl-30px pt-30px w-4/5 m-auto relative"
          @submit.prevent.stop
        >
          <div>
            <InputText
              title="Alert Message"
              placeholder="Please enter a message of at least 1 character"
              v-model="message"
            />
            <MsgComponent
              :msg="UIMessages['alert']"
              :visible="hasError('alert')"
              :color="messageColors['alert']"
            />
          </div>
          <div>
            <RadioButtons
              v-model="frequency"
              title="Frequency"
              :options="options"
            />
            <MsgComponent
              :msg="UIMessages['frequency']"
              :visible="hasError('frequency')"
              :color="messageColors['frequency']"
            />
          </div>
          <div>
            <InputText
              title="Email Recipients"
              placeholder="e.g. someone@company.com + [enter] to add recipient"
              v-model="emailRecipient"
              @keyup.prevent.stop.enter="addEmailHandler"
            />
            <MsgComponent
              :msg="UIMessages['emailRecipient']"
              :visible="hasError('emailRecipient')"
              :color="messageColors['emailRecipient']"
            />
          </div>
          <EmailList
            class="mb-3"
            @delete-email="deleteEmailHandler"
            :emails="emails"
          />
          <div class="w-full flex flex-row-reverse pr-2">
            <LButton
              :disabled="formIsIncompleteOrHasErrors"
              @click="saveAlertHandler($event)"
              >Save</LButton
            >
            <LButton class="mr-3" @click="requestAPITest">Test Alert</LButton>
          </div>
        </form>
        <MsgComponent
          :msg="UIMessages['system']"
          :visible="hasError('system')"
          :color="messageColors['system']"
        />
      </div>
    </div>
  </main>
  <footer class="bottom">1/2022 YFL</footer>
</template>

<style scoped></style>
