import { Head, Link } from '@inertiajs/react';
import { ProfileAvatar, ProfileBackIcon, ProfileEditor, ProfileField } from './components';
import { useProfile } from './useProfile';

export default function Profile() {
    const {
        user,
        initials,
        profile,
        messages,
        feedUrl,
        activeEditor,
        avatarInputRef,
        avatarError,
        avatarProcessing,
        usernameForm,
        emailForm,
        passwordForm,
        openAvatarPicker,
        handleAvatarChange,
        openUsernameEditor,
        openEmailEditor,
        openPasswordEditor,
        cancelEditor,
        handleUsernameChange,
        handleUsernameCurrentPasswordChange,
        handleEmailChange,
        handleEmailCurrentPasswordChange,
        handlePasswordCurrentPasswordChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleUsernameSubmit,
        handleEmailSubmit,
        handlePasswordSubmit,
    } = useProfile();

    return (
        <>
            <Head title={messages.pageTitle} />

            <section className="relative min-h-[calc(100svh-86px)] pt-16 pb-10 lg:pt-8 lg:pr-8">
                <h1 className="ml-[120px] hidden text-2xl leading-9 font-medium lg:block">
                    {messages.myProfile}
                </h1>

                <Link
                    href={feedUrl}
                    aria-label={messages.backToFeed}
                    className="absolute top-4 left-16 inline-flex size-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:hidden"
                >
                    <ProfileBackIcon className="size-8" />
                </Link>

                <div className="relative min-h-[765px] w-full rounded-t-xl bg-[#24222f] pt-6 pb-8 lg:mt-[54px] lg:mr-8 lg:ml-[60px] lg:min-h-0 lg:max-w-[998px] lg:rounded-none lg:bg-transparent lg:pt-[73px] lg:pb-0">
                    <div className="lg:min-h-[703px] lg:rounded-xl lg:bg-[#11101a] lg:pt-[194px] lg:pb-[68px]">
                        <div className="lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2">
                            <ProfileAvatar
                                avatarUrl={user.avatar}
                                initials={initials}
                                username={user.username}
                                uploadLabel={messages.uploadNewPhoto}
                                inputRef={avatarInputRef}
                                error={avatarError}
                                processing={avatarProcessing}
                                onChoose={openAvatarPicker}
                                onChange={handleAvatarChange}
                            />
                        </div>

                        <div className="mx-auto mt-[60px] w-full max-w-[677px] px-8 lg:mt-0 lg:px-8">
                            <div className="grid gap-[31px] lg:gap-10">
                                <ProfileField
                                    label={messages.username}
                                    value={user.username}
                                    editLabel={messages.edit}
                                    onEdit={openUsernameEditor}
                                />
                                <ProfileField
                                    label={messages.email}
                                    value={user.email}
                                    editLabel={messages.edit}
                                    pendingLabel={messages.pendingEmail}
                                    pendingValue={profile.pendingEmail}
                                    onEdit={profile.isPasswordless ? undefined : openEmailEditor}
                                />
                                {!profile.isPasswordless && (
                                    <ProfileField
                                        label={messages.password}
                                        value={messages.hiddenPassword}
                                        editLabel={messages.edit}
                                        onEdit={openPasswordEditor}
                                    />
                                )}
                            </div>

                            <ProfileEditor
                                activeEditor={activeEditor}
                                requiresCurrentPassword={!profile.isPasswordless}
                                messages={messages}
                                username={usernameForm.data.username}
                                usernameCurrentPassword={usernameForm.data.current_password}
                                usernameErrors={usernameForm.errors}
                                usernameProcessing={usernameForm.processing}
                                email={emailForm.data.email}
                                emailCurrentPassword={emailForm.data.current_password}
                                emailErrors={emailForm.errors}
                                emailProcessing={emailForm.processing}
                                passwordCurrentPassword={passwordForm.data.current_password}
                                password={passwordForm.data.password}
                                passwordConfirmation={passwordForm.data.password_confirmation}
                                passwordErrors={passwordForm.errors}
                                passwordProcessing={passwordForm.processing}
                                onUsernameChange={handleUsernameChange}
                                onUsernameCurrentPasswordChange={
                                    handleUsernameCurrentPasswordChange
                                }
                                onEmailChange={handleEmailChange}
                                onEmailCurrentPasswordChange={handleEmailCurrentPasswordChange}
                                onPasswordCurrentPasswordChange={
                                    handlePasswordCurrentPasswordChange
                                }
                                onPasswordChange={handlePasswordChange}
                                onPasswordConfirmationChange={handlePasswordConfirmationChange}
                                onUsernameSubmit={handleUsernameSubmit}
                                onEmailSubmit={handleEmailSubmit}
                                onPasswordSubmit={handlePasswordSubmit}
                                onCancel={cancelEditor}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
