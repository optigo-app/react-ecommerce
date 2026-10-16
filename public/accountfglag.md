In RoopJewellers (RPJewel), the Account Ledger page is rendered based on several hierarchical conditions across sessionStorage configuration flags:

1. Main "ACCOUNT" Tab Visibility
The parent ACCOUNT tab appears only if 

accountValidation()
 returns true:

sessionStorage.getItem("storeInit")?.["IsMyaccount"] === 1
AND at least one page in myAccountFlags has isvisible === 1 (checked against page IDs [1163, 1164, 1157, 1314, 17020, 1159, 18129]).
2. Inclusion in the Account Tabs List (accountInner)
In 

accountDetailPages()
, the Account Ledger object:

javascript
{ id: 1159, tabLabel: "Account Ledger", tabComp: "AccountLedger", compPath: "./accountLedger/AccountLedger" }
is added to accountInner only if:

sessionStorage.getItem("myAccountFlags") contains an entry with pageid === 1159 AND isvisible === 1.
3. Sub-Tab Header Display
In 

Account.js
:

If Storeinit?.IsPriceShow == 0 and e.tabComp === "AccountLedger", the tab is hidden (display: 'none').
If Storeinit?.IsPriceShow == 1, the "Account Ledger" sub-tab is displayed.
4. Component Rendering (<AccountLedger />)
In 

Account.js
:

jsx
{Storeinit?.IsPriceShow == 1 && e?.id === 1159 && (
    <CustomTabPanel value={value1} index={i}>
        <AccountLedger />
    </CustomTabPanel>
)}
<AccountLedger /> is rendered when:

Storeinit?.IsPriceShow == 1 (storeInit object in sessionStorage).
e?.id === 1159 (myAccountFlags has pageid: 1159 with isvisible: 1).
value1 === i (the user has selected the Account Ledger sub-tab index).
5:38 PM
