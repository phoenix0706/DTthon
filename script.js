document.addEventListener("DOMContentLoaded", () => {
  const journeyBoardHead = document.querySelector("#journeyboard__header");
  const journeyBoardBody = document.querySelector("#journeyboard__body");
  const journeyBoardButton = document.querySelector("#journeyboard__btn");
  const journeyBoardTaskNumber = document.querySelector(
    ".journeyboard__task-number"
  );
  const journeyBoardTask = document.querySelector("#journeyboard__task");
  const journeyBoardList = document.querySelector("#journeyboard__list");
  const journeyBoardActive = document.querySelectorAll(".journeyboard__active");
  const projectLoader = document.querySelector("#assets__loader");
  const projectTask = document.querySelector("#task__loading");
  const assets = document.querySelector(".assets");
  journeyBoardButton.addEventListener("click", () => {
    if (journeyBoardButton.getAttribute("data-active") === "0") {
      journeyBoardButton.setAttribute("data-active", "1");

      journeyBoardHead.style.width = "18.7vw";
      journeyBoardBody.style.width = "18.7vw";
      journeyBoardActive.forEach((element) => {
        element.style.visibility = "visible";
      });
      journeyBoardTaskNumber.style.visibility = "hidden";
    } else {
      journeyBoardButton.setAttribute("data-active", "0");

      journeyBoardHead.style.width = "8vw";
      journeyBoardBody.style.width = "8vw";

      journeyBoardActive.forEach((element) => {
        element.style.visibility = "hidden";
      });
      journeyBoardTaskNumber.style.visibility = "visible";
    }
  });
  adjustJourneyBoardHeight(journeyBoardButton, journeyBoardBody);
  fetch("data.json").then((response) => {
    response.json().then((data) => {
      const task = data.tasks[0];
      journeyBoardList.innerHTML = "";
      journeyBoardTask.innerText = `1. ${task.task_title}`;
      projectTask.innerText = task.task_title;
      task.assets.forEach((asset) => {
        const itemHeader = document.createElement("h5");
        const superScript = document.createElement("sup");
        const span = document.createElement("span");

        itemHeader.setAttribute("class", "journeyboard__item-head");
        span.setAttribute("class", "journeyboard__item");

        span.innerText = " . ";
        itemHeader.innerText = asset.asset_title;

        superScript.appendChild(span);
        itemHeader.prepend(superScript);
        journeyBoardList.appendChild(itemHeader);
        itemHeader.append(document.createElement("hr"));
        adjustJourneyBoardHeight(journeyBoardButton, journeyBoardBody);
        if (asset.asset_type === "display_asset") {
          if (asset.asset_content === "reflection") {
            const assetContainer = document.createElement("div");
            const assetHead = document.createElement("div");
            const assetHeading = document.createElement("h4");
            const assetBody = document.createElement("div");
            const assetText = document.createElement("h4");
            const assetButton = document.createElement("button");
            const assetButtonIcon = document.createElement("span");

            assetContainer.setAttribute("class", "asset");
            assetHead.setAttribute("class", "asset__head");
            assetHeading.setAttribute("class", "asset__heading");
            assetBody.setAttribute("class", "asset__body");
            assetText.setAttribute("class", "asset-active");
            assetText.setAttribute("id", "asset-text");
            assetButton.setAttribute("class", "asset-icon");
            assetButton.setAttribute("data-active", "0");
            assetButtonIcon.setAttribute("class", "material-symbols-rounded");

            assetHeading.innerText = asset.asset_title;
            assetText.innerText = asset.display_asset_reflection;
            assetButtonIcon.innerText = "keyboard_arrow_down";

            assetButton.appendChild(assetButtonIcon);
            assetHead.appendChild(assetHeading);
            assetBody.appendChild(assetText);
            assetBody.appendChild(assetButton);
            assetContainer.appendChild(assetHead);
            assetContainer.appendChild(assetBody);
            assets.appendChild(assetContainer);

            assetButton.addEventListener("click", () => {
              const parent = assetButton.parentElement;
              const children = parent.children;

              if (assetButton.getAttribute("data-active") === "0") {
                Object.values(children).forEach((child) => {
                  if (child.getAttribute("class") === "asset-active") {
                    child.style.display = "block";
                  }
                });
                parent.style.height = "auto";

                assetButton.setAttribute("data-active", "1");
              } else {
                Object.values(children).forEach((child) => {
                  if (child.getAttribute("class") === "asset-active") {
                    child.style.display = "none";
                  }
                });
                parent.style.height = "35px";

                assetButton.setAttribute("data-active", "0");
              }
            });
          } else {
            if (asset.display_asset_url) {
              const assetContainer = document.createElement("div");
              const assetHead = document.createElement("div");
              const assetHeading = document.createElement("h4");
              const assetBody = document.createElement("div");
              const assetIframe = document.createElement("iframe");
              const assetDescription = document.createElement("p");
              const assetButton = document.createElement("button");
              const assetButtonIcon = document.createElement("span");

              assetContainer.setAttribute("class", "asset");
              assetHead.setAttribute("class", "asset__head");
              assetHeading.setAttribute("class", "asset__heading");
              assetBody.setAttribute("class", "asset__body");
              assetIframe.setAttribute("class", "asset-active");
              assetIframe.setAttribute("id", "asset-audio");
              assetIframe.setAttribute("src", asset.display_asset_url);
              assetDescription.setAttribute("class", "asset-active");
              assetDescription.setAttribute("id", "asset-audio-description");
              assetButton.setAttribute("class", "asset-icon");
              assetButton.setAttribute("data-active", "0");
              assetButtonIcon.setAttribute("class", "material-symbols-rounded");

              assetHeading.innerText = asset.asset_title;
              assetDescription.innerText = asset.asset_description;
              assetButtonIcon.innerText = "keyboard_arrow_down";

              assetButton.appendChild(assetButtonIcon);
              assetHead.appendChild(assetHeading);
              assetBody.appendChild(assetIframe);
              assetBody.appendChild(assetDescription);
              assetBody.appendChild(assetButton);
              assetContainer.appendChild(assetHead);
              assetContainer.appendChild(assetBody);
              assets.appendChild(assetContainer);

              assetButton.addEventListener("click", () => {
                const parent = assetButton.parentElement;
                const children = parent.children;

                if (assetButton.getAttribute("data-active") === "0") {
                  Object.values(children).forEach((child) => {
                    if (child.getAttribute("class") === "asset-active") {
                      child.style.display = "block";
                    }
                  });
                  parent.style.height = "auto";

                  assetButton.setAttribute("data-active", "1");
                } else {
                  Object.values(children).forEach((child) => {
                    if (child.getAttribute("class") === "asset-active") {
                      child.style.display = "none";
                    }
                  });
                  parent.style.height = "35px";

                  assetButton.setAttribute("data-active", "0");
                }
              });
            } else if (asset.display_asset_docs) {
              const assetContainer = document.createElement("div");
              const assetHead = document.createElement("div");
              const assetHeading = document.createElement("h4");
              const assetBody = document.createElement("div");
              const assetIframe = document.createElement("iframe");
              const assetButton = document.createElement("button");
              const assetButtonIcon = document.createElement("span");

              assetContainer.setAttribute("class", "asset");
              assetHead.setAttribute("class", "asset__head");
              assetHeading.setAttribute("class", "asset__heading");
              assetBody.setAttribute("class", "asset__body");
              assetIframe.setAttribute("class", "asset-active");
              assetIframe.setAttribute("id", "asset-document");
              assetIframe.setAttribute("src", asset.display_asset_docs);
              assetButton.setAttribute("class", "asset-icon");
              assetButton.setAttribute("data-active", "0");
              assetButtonIcon.setAttribute("class", "material-symbols-rounded");

              assetHeading.innerText = asset.asset_title;
              assetButtonIcon.innerText = "keyboard_arrow_down";

              assetButton.appendChild(assetButtonIcon);
              assetHead.appendChild(assetHeading);
              assetBody.appendChild(assetIframe);
              assetBody.appendChild(assetButton);
              assetContainer.appendChild(assetHead);
              assetContainer.appendChild(assetBody);
              assets.appendChild(assetContainer);

              assetButton.addEventListener("click", () => {
                const parent = assetButton.parentElement;
                const children = parent.children;

                if (assetButton.getAttribute("data-active") === "0") {
                  Object.values(children).forEach((child) => {
                    if (child.getAttribute("class") === "asset-active") {
                      child.style.display = "block";
                    }
                  });
                  parent.style.height = "auto";

                  assetButton.setAttribute("data-active", "1");
                } else {
                  Object.values(children).forEach((child) => {
                    if (child.getAttribute("class") === "asset-active") {
                      child.style.display = "none";
                    }
                  });
                  parent.style.height = "35px";

                  assetButton.setAttribute("data-active", "0");
                }
              });
            } else if (asset.display_asset_video) {
              const assetContainer = document.createElement("div");
              const assetHead = document.createElement("div");
              const assetHeading = document.createElement("h4");
              const assetBody = document.createElement("div");
              const assetIframe = document.createElement("iframe");
              const assetButton = document.createElement("button");
              const assetButtonIcon = document.createElement("span");

              assetContainer.setAttribute("class", "asset");
              assetHead.setAttribute("class", "asset__head");
              assetHeading.setAttribute("class", "asset__heading");
              assetBody.setAttribute("class", "asset__body");
              assetIframe.setAttribute("class", "asset-active");
              assetIframe.setAttribute("id", "asset-video");
              assetIframe.setAttribute("src", asset.display_asset_video);
              assetButton.setAttribute("class", "asset-icon");
              assetButton.setAttribute("data-active", "0");
              assetButtonIcon.setAttribute("class", "material-symbols-rounded");

              assetHeading.innerText = asset.asset_title;
              assetButtonIcon.innerText = "keyboard_arrow_down";

              assetButton.appendChild(assetButtonIcon);
              assetHead.appendChild(assetHeading);
              assetBody.appendChild(assetIframe);
              assetBody.appendChild(assetButton);
              assetContainer.appendChild(assetHead);
              assetContainer.appendChild(assetBody);
              assets.appendChild(assetContainer);

              assetButton.addEventListener("click", () => {
                const parent = assetButton.parentElement;
                const children = parent.children;

                if (assetButton.getAttribute("data-active") === "0") {
                  Object.values(children).forEach((child) => {
                    if (child.getAttribute("class") === "asset-active") {
                      child.style.display = "block";
                    }
                  });
                  parent.style.height = "auto";

                  assetButton.setAttribute("data-active", "1");
                } else {
                  Object.values(children).forEach((child) => {
                    if (child.getAttribute("class") === "asset-active") {
                      child.style.display = "none";
                    }
                  });
                  parent.style.height = "35px";

                  assetButton.setAttribute("data-active", "0");
                }
              });
            } else if (asset.display_asset_image) {
              const assetContainer = document.createElement("div");
              const assetHead = document.createElement("div");
              const assetHeading = document.createElement("h4");
              const assetBody = document.createElement("div");
              const assetImage = document.createElement("img");
              const assetButton = document.createElement("button");
              const assetButtonIcon = document.createElement("span");

              assetContainer.setAttribute("class", "asset");
              assetHead.setAttribute("class", "asset__head");
              assetHeading.setAttribute("class", "asset__heading");
              assetBody.setAttribute("class", "asset__body");
              assetImage.setAttribute("class", "asset-active");
              assetImage.setAttribute("id", "asset-image");
              assetImage.setAttribute("src", asset.display_asset_image);
              assetButton.setAttribute("class", "asset-icon");
              assetButton.setAttribute("data-active", "0");
              assetButtonIcon.setAttribute("class", "material-symbols-rounded");

              assetHeading.innerText = asset.asset_title;
              assetButtonIcon.innerText = "keyboard_arrow_down";

              assetButton.appendChild(assetButtonIcon);
              assetHead.appendChild(assetHeading);
              assetBody.appendChild(assetImage);
              assetBody.appendChild(assetButton);
              assetContainer.appendChild(assetHead);
              assetContainer.appendChild(assetBody);
              assets.appendChild(assetContainer);

              assetButton.addEventListener("click", () => {
                const parent = assetButton.parentElement;
                const children = parent.children;

                if (assetButton.getAttribute("data-active") === "0") {
                  Object.values(children).forEach((child) => {
                    if (child.getAttribute("class") === "asset-active") {
                      child.style.display = "block";
                    }
                  });
                  parent.style.height = "auto";

                  assetButton.setAttribute("data-active", "1");
                } else {
                  Object.values(children).forEach((child) => {
                    if (child.getAttribute("class") === "asset-active") {
                      child.style.display = "none";
                    }
                  });
                  parent.style.height = "35px";

                  assetButton.setAttribute("data-active", "0");
                }
              });
            }
          }
        } else if (asset.asset_type === "input_asset") {
          if (asset.asset_content === "reflection") {
            const assetContainer = document.createElement("div");
            const assetHead = document.createElement("div");
            const assetHeading = document.createElement("h4");
            const assetBody = document.createElement("div");
            const assetInput = document.createElement("textarea");
            const assetButton = document.createElement("button");
            const assetButtonIcon = document.createElement("span");

            assetContainer.setAttribute("class", "asset");
            assetHead.setAttribute("class", "asset__head");
            assetHeading.setAttribute("class", "asset__heading");
            assetBody.setAttribute("class", "asset__body");
            assetInput.setAttribute("class", "asset-active");
            assetInput.setAttribute("id", "asset-input");
            assetInput.setAttribute(
              "placeholder",
              "Reflect as per given guidelines"
            );
            assetButton.setAttribute("class", "asset-icon");
            assetButton.setAttribute("data-active", "0");
            assetButtonIcon.setAttribute("class", "material-symbols-rounded");

            assetHeading.innerText = asset.asset_title;
            assetButtonIcon.innerText = "keyboard_arrow_down";

            assetButton.appendChild(assetButtonIcon);
            assetHead.appendChild(assetHeading);
            assetBody.appendChild(assetInput);
            assetBody.appendChild(assetButton);
            assetContainer.appendChild(assetHead);
            assetContainer.appendChild(assetBody);
            assets.appendChild(assetContainer);

            assetButton.addEventListener("click", () => {
              const parent = assetButton.parentElement;
              const children = parent.children;

              if (assetButton.getAttribute("data-active") === "0") {
                Object.values(children).forEach((child) => {
                  if (child.getAttribute("class") === "asset-active") {
                    child.style.display = "block";
                  }
                });
                parent.style.height = "auto";

                assetButton.setAttribute("data-active", "1");
              } else {
                Object.values(children).forEach((child) => {
                  if (child.getAttribute("class") === "asset-active") {
                    child.style.display = "none";
                  }
                });
                parent.style.height = "35px";

                assetButton.setAttribute("data-active", "0");
              }
            });
          } else if (asset.asset_content === "article") {
            const assetContainer = document.createElement("div");
            const assetHead = document.createElement("div");
            const assetHeading = document.createElement("h4");
            const assetBody = document.createElement("div");
            const assetInput = document.createElement("textarea");
            const assetButton = document.createElement("button");
            const assetButtonIcon = document.createElement("span");

            assetContainer.setAttribute("class", "asset");
            assetHead.setAttribute("class", "asset__head");
            assetHeading.setAttribute("class", "asset__heading");
            assetBody.setAttribute("class", "asset__body");
            assetInput.setAttribute("class", "asset-active");
            assetInput.setAttribute("id", "asset-article");
            assetInput.setAttribute(
              "placeholder",
              "Write an article as per given guidelines"
            );
            assetButton.setAttribute("class", "asset-icon");
            assetButton.setAttribute("data-active", "0");
            assetButtonIcon.setAttribute("class", "material-symbols-rounded");

            assetHeading.innerText = asset.asset_title;
            assetButtonIcon.innerText = "keyboard_arrow_down";

            assetButton.appendChild(assetButtonIcon);
            assetHead.appendChild(assetHeading);
            assetBody.appendChild(assetInput);
            assetBody.appendChild(assetButton);
            assetContainer.appendChild(assetHead);
            assetContainer.appendChild(assetBody);
            assets.appendChild(assetContainer);

            assetButton.addEventListener("click", () => {
              const parent = assetButton.parentElement;
              const children = parent.children;

              if (assetButton.getAttribute("data-active") === "0") {
                Object.values(children).forEach((child) => {
                  if (child.getAttribute("class") === "asset-active") {
                    child.style.display = "block";
                  }
                });
                parent.style.height = "auto";

                assetButton.setAttribute("data-active", "1");
              } else {
                Object.values(children).forEach((child) => {
                  if (child.getAttribute("class") === "asset-active") {
                    child.style.display = "none";
                  }
                });
                parent.style.height = "35px";

                assetButton.setAttribute("data-active", "0");
              }
            });
          } else if (asset.asset_content === "tb") {
            const assetContainer = document.createElement("div");
            const assetHead = document.createElement("div");
            const assetHeading = document.createElement("h4");
            const assetBody = document.createElement("div");
            const assetThreadHeading = document.createElement("h4");
            const assetSubThreadContainer = document.createElement("div");
            const assetSubThread = document.createElement("textarea");
            const assetSubThreadNew = assetSubThread.cloneNode();
            const assetSubThreadButton = document.createElement("button");
            const assetSubThreadButtonText = document.createElement("h5");
            const assetThreadSummaryHeading = document.createElement("h4");
            const assetThreadSummary = document.createElement("textarea");
            const assetThreadButton = document.createElement("button");
            const assetThreadButtonText = document.createElement("h5");
            const assetButton = document.createElement("button");
            const assetButtonIcon = document.createElement("span");

            let threadNumber = 1;

            assetContainer.setAttribute("class", "asset");
            assetHead.setAttribute("class", "asset__head");
            assetHeading.setAttribute("class", "asset__heading");
            assetBody.setAttribute("class", "asset__body");
            assetThreadHeading.setAttribute("class", "asset-active");
            assetThreadHeading.setAttribute("id", "asset-thread-heading");
            assetSubThreadContainer.setAttribute("class", "asset-active");
            assetSubThreadContainer.setAttribute(
              "id",
              "asset-sub-thread-container"
            );
            assetSubThread.setAttribute("id", "asset-sub-thread");
            assetSubThread.setAttribute("placeholder", "Enter text here");
            assetSubThreadNew.setAttribute("id", "asset-sub-thread");
            assetSubThreadNew.setAttribute("placeholder", "Enter text here");
            assetSubThreadButton.setAttribute("class", "asset-active");
            assetSubThreadButton.setAttribute("id", "asset-sub-thread-button");
            assetThreadSummaryHeading.setAttribute("class", "asset-active");
            assetThreadSummary.setAttribute("class", "asset-active");
            assetThreadSummary.setAttribute("id", "asset-thread-summary");
            assetThreadSummary.setAttribute("placeholder", "Enter text here");
            assetThreadButton.setAttribute("class", "asset-active");
            assetThreadButton.setAttribute("id", "asset-thread-button");
            assetButton.setAttribute("class", "asset-icon");
            assetButton.setAttribute("data-active", "0");
            assetButtonIcon.setAttribute("class", "material-symbols-rounded");

            assetHeading.innerText = asset.asset_title;
            assetThreadHeading.innerText = `Thread ${threadNumber}`;
            assetSubThreadButtonText.innerText = " + Sub thread ";
            assetThreadSummaryHeading.innerText = "Thread Summary";
            assetThreadButtonText.innerHTML = " + New Thread ";
            assetButtonIcon.innerText = "keyboard_arrow_down";

            assetButton.appendChild(assetButtonIcon);
            assetHead.appendChild(assetHeading);
            assetSubThreadContainer.appendChild(assetSubThread);
            assetSubThreadContainer.appendChild(assetSubThreadNew);
            assetSubThreadButton.appendChild(assetSubThreadButtonText);
            assetThreadButton.appendChild(assetThreadButtonText);
            assetBody.appendChild(assetButton);
            assetBody.appendChild(assetThreadHeading);
            assetBody.appendChild(assetSubThreadContainer);
            assetBody.appendChild(assetSubThreadButton);
            assetBody.appendChild(assetThreadSummaryHeading);
            assetBody.appendChild(assetThreadSummary);
            assetBody.appendChild(assetThreadButton);
            assetContainer.appendChild(assetHead);
            assetContainer.appendChild(assetBody);
            assets.appendChild(assetContainer);

            assetSubThreadButton.addEventListener("click", () => {
              const assetSubThreadNewest = assetSubThread.cloneNode();

              assetSubThreadContainer.appendChild(assetSubThreadNewest);
            });

            assetThreadButton.addEventListener("click", () => {
              const assetThreadHeadingNew = assetThreadHeading.cloneNode();
              const assetSubThreadContainerNew =
                assetSubThreadContainer.cloneNode();
              const assetSubThreadAgain = assetSubThread.cloneNode();
              const assetSubThreadAgainNew = assetSubThread.cloneNode();
              const assetSubThreadButtonNew = assetSubThreadButton.cloneNode();
              const assetSubThreadButtonTextNew =
                assetSubThreadButtonText.cloneNode();
              const assetThreadSummaryHeadingNew =
                assetThreadSummaryHeading.cloneNode();
              const assetThreadSummaryNew = assetThreadSummary.cloneNode();

              ++threadNumber;

              assetThreadHeadingNew.innerText = `Thread ${threadNumber}`;
              assetSubThreadButtonTextNew.innerText = " + Sub thread ";
              assetThreadSummaryHeadingNew.innerText = "Thread Summary";

              assetSubThreadContainerNew.appendChild(assetSubThreadAgain);
              assetSubThreadContainerNew.appendChild(assetSubThreadAgainNew);
              assetSubThreadButtonNew.appendChild(assetSubThreadButtonTextNew);
              assetBody.insertBefore(assetThreadHeadingNew, assetThreadButton);
              assetBody.insertBefore(
                assetSubThreadContainerNew,
                assetThreadButton
              );
              assetBody.insertBefore(
                assetSubThreadButtonNew,
                assetThreadButton
              );
              assetBody.insertBefore(
                assetThreadSummaryHeadingNew,
                assetThreadButton
              );
              assetBody.insertBefore(assetThreadSummaryNew, assetThreadButton);

              assetSubThreadButtonNew.addEventListener("click", () => {
                const assetSubThreadNewest = assetSubThread.cloneNode();

                assetSubThreadContainerNew.appendChild(assetSubThreadNewest);
              });
            });

            assetButton.addEventListener("click", () => {
              const parent = assetButton.parentElement;
              const children = parent.children;

              if (assetButton.getAttribute("data-active") === "0") {
                Object.values(children).forEach((child) => {
                  if (child.getAttribute("class") === "asset-active") {
                    child.style.display = "block";
                  }
                });
                parent.style.height = "auto";

                assetButton.setAttribute("data-active", "1");
              } else {
                Object.values(children).forEach((child) => {
                  if (child.getAttribute("class") === "asset-active") {
                    child.style.display = "none";
                  }
                });
                parent.style.height = "35px";

                assetButton.setAttribute("data-active", "0");
              }
            });
          } else if (asset.asset_content === "eb") {
            const assetContainer = document.createElement("div");
            const assetHead = document.createElement("div");
            const assetHeading = document.createElement("h4");
            const assetBody = document.createElement("div");
            const assetThreadIntroduction = document.createElement("h4");
            const assetThreadIntroductionText =
              document.createElement("textarea");
            const assetThreadHeading = document.createElement("h4");
            const assetSubThreadContainer = document.createElement("div");
            const assetSubThread = document.createElement("textarea");
            const assetSubThreadNew = assetSubThread.cloneNode();
            const assetSubThreadButton = document.createElement("button");
            const assetSubThreadButtonText = document.createElement("h5");
            const assetThreadArgumentHeading = document.createElement("h4");
            const assetThreadArgument = document.createElement("textarea");
            const assetThreadButton = document.createElement("button");
            const assetThreadButtonText = document.createElement("h5");
            const assetThreadConclusionHeading = document.createElement("h4");
            const assetThreadConclusion = document.createElement("textarea");
            const assetButton = document.createElement("button");
            const assetButtonIcon = document.createElement("span");

            let threadNumber = 1;

            assetContainer.setAttribute("class", "asset");
            assetHead.setAttribute("class", "asset__head");
            assetHeading.setAttribute("class", "asset__heading");
            assetBody.setAttribute("class", "asset__body");
            assetThreadIntroduction.setAttribute("class", "asset-active");
            assetThreadIntroduction.setAttribute(
              "id",
              "asset-thread-introduction"
            );
            assetThreadIntroductionText.setAttribute("class", "asset-active");
            assetThreadIntroductionText.setAttribute(
              "id",
              "asset-thread-introduction-text"
            );
            assetThreadIntroductionText.setAttribute(
              "placeholder",
              "Enter text here"
            );
            assetThreadHeading.setAttribute("class", "asset-active");
            assetThreadHeading.setAttribute("id", "asset-thread-heading");
            assetSubThreadContainer.setAttribute("class", "asset-active");
            assetSubThreadContainer.setAttribute(
              "id",
              "asset-sub-thread-container"
            );
            assetSubThread.setAttribute("id", "asset-sub-thread");
            assetSubThread.setAttribute("placeholder", "Enter text here");
            assetSubThreadNew.setAttribute("id", "asset-sub-thread");
            assetSubThreadNew.setAttribute("placeholder", "Enter text here");
            assetSubThreadButton.setAttribute("class", "asset-active");
            assetSubThreadButton.setAttribute("id", "asset-sub-thread-button");
            assetThreadArgumentHeading.setAttribute("class", "asset-active");
            assetThreadArgument.setAttribute("class", "asset-active");
            assetThreadArgument.setAttribute("id", "asset-thread-argument");
            assetThreadArgument.setAttribute("placeholder", "Enter text here");
            assetThreadButton.setAttribute("class", "asset-active");
            assetThreadButton.setAttribute("id", "asset-thread-button");
            assetThreadConclusionHeading.setAttribute("class", "asset-active");
            assetThreadConclusion.setAttribute("class", "asset-active");
            assetThreadConclusion.setAttribute("id", "asset-thread-conclusion");
            assetThreadConclusion.setAttribute(
              "placeholder",
              "Enter text here"
            );
            assetButton.setAttribute("class", "asset-icon");
            assetButton.setAttribute("data-active", "0");
            assetButtonIcon.setAttribute("class", "material-symbols-rounded");

            assetHeading.innerText = asset.asset_title;
            assetThreadIntroduction.innerText = "Introduction";
            assetThreadHeading.innerText = `Thread ${threadNumber}`;
            assetSubThreadButtonText.innerText = " + Example ";
            assetThreadArgumentHeading.innerText = "Argument";
            assetThreadButtonText.innerText = " + New Thread ";
            assetThreadConclusionHeading.innerText = "Conclusion";
            assetButtonIcon.innerText = "keyboard_arrow_down";

            assetButton.appendChild(assetButtonIcon);
            assetHead.appendChild(assetHeading);
            assetSubThreadContainer.appendChild(assetSubThread);
            assetSubThreadContainer.appendChild(assetSubThreadNew);
            assetSubThreadButton.appendChild(assetSubThreadButtonText);
            assetThreadButton.appendChild(assetThreadButtonText);
            assetBody.appendChild(assetThreadIntroduction);
            assetBody.appendChild(assetThreadIntroductionText);
            assetBody.appendChild(assetThreadHeading);
            assetBody.appendChild(assetSubThreadContainer);
            assetBody.appendChild(assetSubThreadButton);
            assetBody.appendChild(assetThreadArgumentHeading);
            assetBody.appendChild(assetThreadArgument);
            assetBody.appendChild(assetThreadButton);
            assetBody.appendChild(assetThreadConclusionHeading);
            assetBody.appendChild(assetThreadConclusion);
            assetBody.appendChild(assetButton);
            assetContainer.appendChild(assetHead);
            assetContainer.appendChild(assetBody);
            assets.appendChild(assetContainer);

            assetSubThreadButton.addEventListener("click", () => {
              const assetSubThreadNewest = assetSubThread.cloneNode();

              assetSubThreadContainer.appendChild(assetSubThreadNewest);
            });

            assetThreadButton.addEventListener("click", () => {
              const assetThreadHeadingNew = assetThreadHeading.cloneNode();
              const assetSubThreadContainerNew =
                assetSubThreadContainer.cloneNode();
              const assetSubThreadAgain = assetSubThread.cloneNode();
              const assetSubThreadAgainNew = assetSubThread.cloneNode();
              const assetSubThreadButtonNew = assetSubThreadButton.cloneNode();
              const assetSubThreadButtonTextNew =
                assetSubThreadButtonText.cloneNode();
              const assetThreadArgumentHeadingNew =
                assetThreadArgumentHeading.cloneNode();
              const assetThreadArgumentNew = assetThreadArgument.cloneNode();

              ++threadNumber;

              assetThreadHeadingNew.innerText = `Thread ${threadNumber}`;
              assetSubThreadButtonTextNew.innerText = " + Example ";
              assetThreadArgumentHeadingNew.innerText = "Thread Argument";

              assetSubThreadContainerNew.appendChild(assetSubThreadAgain);
              assetSubThreadContainerNew.appendChild(assetSubThreadAgainNew);
              assetSubThreadButtonNew.appendChild(assetSubThreadButtonTextNew);
              assetBody.insertBefore(assetThreadHeadingNew, assetThreadButton);
              assetBody.insertBefore(
                assetSubThreadContainerNew,
                assetThreadButton
              );
              assetBody.insertBefore(
                assetSubThreadButtonNew,
                assetThreadButton
              );
              assetBody.insertBefore(
                assetThreadArgumentHeadingNew,
                assetThreadButton
              );
              assetBody.insertBefore(assetThreadArgumentNew, assetThreadButton);

              assetSubThreadButtonNew.addEventListener("click", () => {
                const assetSubThreadNewest = assetSubThread.cloneNode();

                assetSubThreadContainerNew.appendChild(assetSubThreadNewest);
              });
            });

            assetButton.addEventListener("click", () => {
              const parent = assetButton.parentElement;
              const children = parent.children;

              if (assetButton.getAttribute("data-active") === "0") {
                Object.values(children).forEach((child) => {
                  if (child.getAttribute("class") === "asset-active") {
                    child.style.display = "block";
                  }
                });
                parent.style.height = "auto";

                assetButton.setAttribute("data-active", "1");
              } else {
                Object.values(children).forEach((child) => {
                  if (child.getAttribute("class") === "asset-active") {
                    child.style.display = "none";
                  }
                });
                parent.style.height = "35px";

                assetButton.setAttribute("data-active", "0");
              }
            });
          }
        }
      });
      projectLoader.remove();
    });
  });

  window.addEventListener("resize", () => {
    journeyBoardButton.setAttribute("data-active", "0");

    journeyBoardHead.style.width = "10vw";
    journeyBoardBody.style.width = "10vw";

    journeyBoardActive.forEach((element) => {
      element.style.visibility = "hidden";
    });
    journeyBoardTaskNumber.style.visibility = "visible";

    adjustJourneyBoardHeight(journeyBoardButton, journeyBoardBody);
  });
});

function adjustJourneyBoardHeight(button, body) {
  body.style.height = "auto";

  button.click();

  const height = window.getComputedStyle(body).height;

  button.click();

  body.style.height = height;
}
