import { useState } from "react";
import moment from "moment";

const getInstallPromptLastSeenAt = () => localStorage.getItem(promptName);

const setInstallPromptSeenToday = () => {
  const today = moment().toISOString();
  localStorage.setItem(promptName, today);
};

function getUserShouldBePromptedToInstall() {
  const lastPrompt = moment(getInstallPromptLastSeenAt(promptName));
  const daysSinceLastPrompt = moment().diff(lastPrompt, "days");
  return (
    isNaN(daysSinceLastPrompt) ||
    daysSinceLastPrompt > daysToWaitBeforePromptingAgain
  );
}

const useShouldShowPrompt = (daysToWaitBeforePromptingAgain = 30) => {
  const [
    userShouldBePromptedToInstall,
    setUserShouldBePromptedToInstall,
  ] = useState(
    getUserShouldBePromptedToInstall(promptName, daysToWaitBeforePromptingAgain)
  );

  const handleUserSeeingInstallPrompt = () => {
    setUserShouldBePromptedToInstall(false);
    setInstallPromptSeenToday(promptName);
  };

  return [userShouldBePromptedToInstall, handleUserSeeingInstallPrompt];
};
export default useShouldShowPrompt;
