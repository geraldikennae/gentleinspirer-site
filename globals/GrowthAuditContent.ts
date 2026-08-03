import type { GlobalConfig } from "payload";

function stageAdviceFields(defaults: { line: string; means: string; unlock: string; step: string }) {
  return [
    { name: "line", label: "One-line read", type: "textarea" as const, required: true, defaultValue: defaults.line },
    { name: "means", label: "What this usually means", type: "textarea" as const, required: true, defaultValue: defaults.means },
    { name: "unlock", label: "What usually unlocks it", type: "textarea" as const, required: true, defaultValue: defaults.unlock },
    { name: "step", label: "Your first step this week", type: "textarea" as const, required: true, defaultValue: defaults.step },
  ];
}

export const GrowthAuditContent: GlobalConfig = {
  slug: "growth-audit-content",
  label: "Growth Audit",
  admin: {
    description: "The advice shown for whichever stage comes out weakest on /growth-audit, and reused in the result email. The twelve statements themselves aren't editable here -- they're fixed, since the scoring depends on their exact order and count.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "advice",
      label: "Weakest-stage advice, by stage",
      type: "group",
      fields: [
        {
          name: "clarity",
          label: "Clarity",
          type: "group",
          fields: stageAdviceFields({
            line: "You are moving, but you have not named where.",
            means:
              "Effort is not your problem. Direction is. When the outcome is unnamed, every reasonable option looks equally worth doing, so energy spreads thin and progress feels like motion without distance. This is the most common constraint and the one people are most reluctant to admit, because working hard feels like proof that the direction is fine.",
            unlock:
              "One sentence, written down, that names the single outcome that matters most in the next ninety days. Then a second sentence naming what you are deliberately not doing to protect it. Clarity is not a feeling, it is a written decision you can be held to.",
            step: "Write the sentence today. Show it to one person who will tell you if it is vague. If they cannot repeat it back accurately, it is not clear yet.",
          }),
        },
        {
          name: "structure",
          label: "Structure",
          type: "group",
          fields: stageAdviceFields({
            line: "It depends on you being present.",
            means:
              "You know what you want, but the way things are built means nothing happens without you in the room. That is not a people problem or a motivation problem, it is a design problem. Systems that require your attention to function will always cap out at the size of your attention.",
            unlock:
              "Move the important work onto a schedule and give every recurring decision a named owner. The test is simple: if you went quiet for a week, what would stop? Whatever stops is where the structure is missing.",
            step: "Pick the one thing that only happens when you push it. Put it in the calendar on a fixed day, and write down who owns it besides you.",
          }),
        },
        {
          name: "execution",
          label: "Execution",
          type: "group",
          fields: stageAdviceFields({
            line: "You start well and finish rarely.",
            means:
              "The thinking is done and the plan is sound, but the gap between deciding and shipping is where things go quiet. Usually this is because the increments are too large to complete, so each one stays open long enough for the next idea to arrive and pull attention away.",
            unlock:
              "Smaller increments with visible completion. Something you can genuinely finish this week, not something you can start this week. Visible progress is the fuel; without it, discipline burns out trying to run on willpower alone.",
            step: "Take the biggest open thing and cut it down to one piece you can finish in five days. Finish that piece before touching anything else.",
          }),
        },
        {
          name: "discipline",
          label: "Discipline",
          type: "group",
          fields: stageAdviceFields({
            line: "It holds on good weeks and collapses on bad ones.",
            means:
              "You can do the work when conditions are right, which means the system is currently dependent on your mood. Motivation is what you reach for when the design is wrong, and it always runs out at exactly the moment it is needed most.",
            unlock:
              "Consistency over intensity. Something small enough to survive a difficult week is worth more than something ambitious that only survives good ones. The rhythm matters more than the volume.",
            step: "Halve one commitment until it is small enough that a bad week cannot break it. Then do not miss it for four weeks.",
          }),
        },
        {
          name: "evolution",
          label: "Evolution",
          type: "group",
          fields: stageAdviceFields({
            line: "You are consistent, but you are not learning.",
            means:
              "The system runs and the work gets done, which is further than most people get. What is missing is the honest look backwards, so the same inefficiencies quietly repeat and last year and this year look more similar than they should.",
            unlock:
              "A short review on a fixed rhythm, not one triggered by things going wrong. Twenty minutes weekly beats an hour quarterly, because it happens before problems compound rather than after.",
            step: "Book twenty minutes this Sunday. Ask what moved, what you avoided, and the one thing for next week. Same chair, same time, every week.",
          }),
        },
      ],
    },
  ],
};
