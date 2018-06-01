---
layout: post
title: Decentralized identity management
date: 2018-06-01
comments: true
analytics: true
---

## Personal identity management
Suppose Bob's shopping around for health insurance. He looks into several health insurance providers (hereafter HIPs), and he finds out that some HIPs are willing to reduce his premium, if they can obtain copies of his personal data from the police. Behind the scenes, suppose that the HIPs are willing to pay the police for Bob's data.

*Dystopia?*

Well, not exactly...

## Bob's situation with respect to his personal data

Let's go through the details of how Bob's state of mind.

Assume #1 - Bob is a rational actor, e.g. Bob is motivated to maximize on his own interests, and minimize his losses. Thus, Bob is interested in obtaining good health insurance. He wants to pay as little as possible, and he wants his insurance to be good.

Assume #2 Bob believes three propositions:

    Proposition #1. I have a clean driving record.  
    Proposition #2. HIP believes that people with clean driving records are less likely in the future to require the services of a HIP.
    Proposition #3. People that are less likely to require the services of a HIP pay less for HIP services.

With these assumptions, Bob would likely allow the police to share his **person identifying data** (pid) with HIPs. In other words, Bob would **consent** to the exchange of his personal data between the two parties, given that his interests are being maximized, and his losses minimized.

It is not such a dystopia after all.

### But, there are problems

#### Problem 1
Ok, Bob wants the HIP to have his driving record.

**Question: Can Bob just send his driving record directly to the HIP?**

Obviously not.

*Bob could send the HIP some made-up bullshit.*

Thus, HIPs need some protection.

(Restated: Bob wants the HIP to have his record, and the HIP wants to believe that the record is authentic, but they need to establish some trust.)

#### Problem 2
Bob and the HIP have a problem (see above).

Here's one naive solution:

1. Have the HIP get Bob's record directly from the police themselves.

**Can the police just give the HIP the record?**

Obviously not.

**The police can't just go around giving away records. First, people would revolt (I hope?).**

The police just need Bob's consent.

#### Problem 3

There's a cost to gathering, processing, storing, and distributing data. Thus, *even if it is the police, and even if they have Bob's consent*, the police need to be compensated for their information service.

Here's one naive solution:

The HIPs can offer the police some incentive - e.g. money - for sending them a verified copy of Bob's driving record.

### Problems solved?

Let's review.

1. First, Bob's gotta tell the police that he consents to give his pid to the HIP.
2. Second, the HIPs gotta agree to pay the police to give them Bob's record.
3. Third, the police is gotta give the HIP the record, and the HIP's gotta give the police the money.

Ok, so, it's not dystopia.

But, I do not like authority. So, can we design a decentralized version of the identity management solutions above? One that basically takes the police holding the record out of the equation?

## Decentralized personal identity management in a DAG (directed acyclic graph)

Let's define terms first.

**User** - a node in the network that wishes to reveal personally identifying data (pid)

**Provider** - a node in the network that wishes to obtain a user's pid.

**Certifier** - a node in the network that both the user and the provider trust to provide reliable metadata on the user.

**Personally identifying transaction (pid-tx)** - a transaction representing the identity of the node

**Acknowledgement transaction** - a transaction representing the acknowledgement by an entity of a pid-tx by either an approver or a certifier.

**Outstanding negotiation** - the state of affairs in which an approver and a certifier have both issued acknowledgement transactions, and the user is notified and prompted to provide a consent transaction.

**Consent transaction** - a transaction representing the user's consent to an outstanding negotiation on the user's pid_tx.  

**Negotiation transaction** - a transaction made by a provider representing the provider's acceptance of the certifier as an authority for the provider's target pid_tx.

**Certification transaction** - a transaction made by a certifier representing the certifiers acceptance of the terms of the provider's acknowledge transaction, negotiation transaction, and the user's pid_tx.

**Closing transaction** - a transaction made by a provider representing the provider's acknowledge of receipt of the pid.

<img src="https://www.danjcook.com/images/Untitled Diagram.png" class="img-fluid">

**Figure 1.**

Let's go through what's going on in Figure 1.

A user makes a personally identifying transaction (pid-tx), which represents the node's consent to a release of pid to a provider with the assistance of an intermediary called a certifier.

The protocol pushes a notice to the provider requesting access to the user's pid, and a set of possible certifiers of the pid.  

Provider's are entities wishing to obtain access to the pid_tx content. Certifiers are entities in possession of the ability to testify that the pid_tx was in fact issued by, owned by, or generated by the user.

The providers that received the user pid_tx notification should issue an acknowledgement transaction, which acknowledges the presence of their user's alleged pid in the pid-tx. In the event that there is only one user, the provider will reference only one transaction. In the event that there are many, the provider will reference at most K pid_txs. The provider's transaction is a representation of their commitment to compensate at a certain amount any possible certifiers for the validation of a user's pid_tx.

In the presence of an acknowledgement transaction, the protocol should prompt certifiers that received the pid_tx notification to issue their own acknowledgement transaction acknowledging the presence of a user's pid_tx for which they can offer validation, and the provider's commitment to fulfil an obligation to the certifier upon receipt of valid pid.  

The protocol should subscribe the user to providers and certifiers that approve the user's original pid_tx. Upon notification of an outstanding negotiation on the pid_tx, the protocol should prompt the user to issue a new consent transaction that approves the certifier's and the provider's acknowledgement transactions. The user's consent transaction represents the user's consent to the transfer between a provider and a certifier of information pertaining to the user's identity.

If the user approves of the provider's and certifier's acknowledgement transactions, then the protocol should prompt the provider to initiate finalization with a negotiation transaction that approves the certifier's acknowledgement transaction and the user's consent transaction. Next, the protocol should prompt to make a certification transaction, which approves of the user's consent transaction and the provider's negotiation transaction.

If the certifier makes a certification transaction, then the protocol should prompt the provider to make a closing transaction, which approves the user's consent transaction and the certifier's certification transaction.
Terms

## Criticism
Ok, I admit, this is not fully worked out. I will update when I come up with my own criticisms. But, any thoughts appreciated.
